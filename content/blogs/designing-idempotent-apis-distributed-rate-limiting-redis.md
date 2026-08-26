---
title: "Designing Idempotent REST APIs & Distributed Rate Limiters with Node.js, Redis & PostgreSQL"
slug: "designing-idempotent-apis-distributed-rate-limiting-redis"
excerpt: "Architecting resilient financial APIs that gracefully prevent duplicate payment charges, mitigate network timeouts with atomic Redis locks, and enforce sliding-window rate limiting."
author: "Nahid Karim Ankur"
role: "Software Engineer @ Celloscope Ltd."
date: "2026-02-25"
readTime: "9 min read"
category: "Backend Architecture"
tags: ["Node.js", "Redis", "Idempotency", "System Design", "Distributed Systems", "API Security"]
coverIcon: "Server"
gradient: "from-cyan-500/20 via-emerald-500/10 to-transparent"
---

# Designing Idempotent REST APIs & Distributed Rate Limiters with Node.js, Redis & PostgreSQL

In mission-critical backend systems—particularly in microfinance, banking, and e-commerce—network failures are inevitable. A mobile client might submit a `POST /api/v1/payments/disburse` request, the database completes the ledger write, but an edge network drop prevents the HTTP 200 response from reaching the client.

If the user or automated client retry mechanism blindly re-submits the request, you risk **double-charging the user or disbursing funds twice**.

In this engineering note, we explore production patterns for implementing **Idempotency Keys** with atomic Redis locks and building a **Sliding Window Log Rate Limiter** to protect backend APIs from abusive traffic.

---

## 1. The Anatomy of an Idempotent Request

An API endpoint is **idempotent** if making multiple identical requests has the exact same side-effects as making a single request. While `GET`, `PUT`, and `DELETE` are inherently idempotent by HTTP specification, `POST` is not.

```
 Client                          API Gateway                    Redis / Database
   │                                  │                                │
   ├── POST /payments (Idem-Key: X) ──>│                                │
   │                                  ├── SETNX idem:X "PROCESSING" ──>│ (Lock Acquired)
   │                                  │                                │
   │                                  ├── Execute SQL DB Transaction ──>│ (Ledger Written)
   │                                  │                                │
   │                                  ├── SET idem:X JSON_RESPONSE ───>│ (Cached 24h)
   │<── HTTP 200 { status: OK } ──────┤                                │
   │    [Network Packet Dropped]      │                                │
   │                                  │                                │
   ├── RETRY POST /payments (Key: X) ─>│                                │
   │                                  ├── GET idem:X ──────────────────>│ (Cache Hit!)
   │<── HTTP 200 { status: OK } ──────┴─ [Return Cached Response] ─────┘ (No DB Write)
```

---

## 2. Implementing Atomic Idempotency Middleware in Node.js

To prevent race conditions where two concurrent requests with the same key arrive within 5ms of each other, we utilize Redis's atomic `SET key value NX PX <ttl>` command:

```typescript
// src/middleware/idempotency.middleware.ts
import { Request, Response, NextFunction } from "express";
import { redisClient } from "@/lib/redis";

const IDEMPOTENCY_HEADER = "x-idempotency-key";
const LOCK_TTL_MS = 15000; // 15 seconds lock while processing
const CACHE_TTL_SECONDS = 86400; // 24 hours response cache

export async function idempotencyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Only enforce idempotency on state-mutating requests
  if (req.method !== "POST" && req.method !== "PATCH") {
    return next();
  }

  const idempotencyKey = req.header(IDEMPOTENCY_HEADER);
  if (!idempotencyKey) {
    return next(); // Or return 400 Bad Request if mandatory
  }

  const redisKey = `idempotency:${req.baseUrl}:${idempotencyKey}`;

  // 1. Check if we already have a cached completed response
  const existingRecord = await redisClient.get(redisKey);
  if (existingRecord) {
    try {
      const parsed = JSON.parse(existingRecord);
      if (parsed.status === "PROCESSING") {
        // Request is currently being processed by another worker thread
        return res.status(409).json({
          error: "A concurrent request with this idempotency key is currently processing.",
        });
      }
      // Return previously generated response
      res.setHeader("X-Cache-Lookup", "HIT");
      return res.status(parsed.statusCode).json(parsed.body);
    } catch (e) {
      // Fallback if parsing fails
    }
  }

  // 2. Atomically acquire lock using SET NX
  const lockAcquired = await redisClient.set(
    redisKey,
    JSON.stringify({ status: "PROCESSING" }),
    "PX",
    LOCK_TTL_MS,
    "NX"
  );

  if (!lockAcquired) {
    return res.status(409).json({
      error: "Conflict: Concurrent request in flight.",
    });
  }

  // 3. Intercept response to cache upon completion
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    // Save final response in Redis with 24-hour expiration
    redisClient.set(
      redisKey,
      JSON.stringify({
        status: "COMPLETED",
        statusCode: res.statusCode,
        body,
      }),
      "EX",
      CACHE_TTL_SECONDS
    );
    return originalJson(body);
  };

  next();
}
```

---

## 3. Distributed Sliding-Window Rate Limiting

Standard fixed-window rate limiters (e.g. 100 requests per minute) are vulnerable to traffic spikes at window boundaries: an attacker can send 100 requests at 11:59:59 and another 100 requests at 12:00:01, bursting 200 requests within 2 seconds.

### The Solution: Redis Sorted Sets (`ZSET`)

Using Redis sorted sets, we score each request by its high-precision millisecond timestamp and prune entries older than `now - windowSize`:

```typescript
// src/services/rate-limiter.service.ts
import { redisClient } from "@/lib/redis";

export async function checkRateLimit(
  identifier: string,
  limit: number = 100,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const clearBefore = now - windowSeconds * 1000;

  // Execute pipeline atomically in a single network round-trip
  const pipeline = redisClient.pipeline();
  
  // Remove timestamps outside the sliding window
  pipeline.zremrangebyscore(key, 0, clearBefore);
  
  // Add current request timestamp
  pipeline.zadd(key, now, `${now}:${Math.random()}`);
  
  // Count total valid requests inside the current window
  pipeline.zcard(key);
  
  // Set automatic key expiration
  pipeline.expire(key, windowSeconds);

  const results = await pipeline.exec();
  const requestCount = results?.[2]?.[1] as number;

  const allowed = requestCount <= limit;
  const remaining = Math.max(0, limit - requestCount);

  return { allowed, remaining };
}
```

---

## 4. Handling Database Constraint Fallbacks

Never rely solely on application memory or Redis caches for financial integrity. Always enforce unique constraints in the PostgreSQL database layer as the ultimate source of truth:

```sql
-- Database-level safety net
ALTER TABLE loan_disbursements
ADD CONSTRAINT uq_disbursement_idempotency
UNIQUE (mfi_tenant_id, idempotency_key);
```

If Redis fails or connection drops, PostgreSQL will reject duplicate insertions with error code `23505 (unique_violation)`, which the Node.js API can catch and translate into a safe HTTP conflict response.

---

## Production Takeaways

1. **Always use atomic Redis primitives (`SET NX`, `ZREMRANGEBYSCORE`)** to avoid multi-worker race conditions.
2. **Combine In-Memory locks with Database Constraints** for defense-in-depth security.
3. **Include unique tenant prefixes** in your cache keys to ensure strict multi-tenant isolation.
