---
title: "PostgreSQL Table Partitioning & Concurrency Control: Scaling Multi-Tenant Tables to 50M+ Rows"
slug: "postgresql-table-partitioning-concurrency-scaling"
excerpt: "Architecting declarative range and list partitioning in PostgreSQL 16, optimizing partition pruning, and managing MVCC table bloat under high-concurrency enterprise workloads."
author: "Nahid Karim Ankur"
role: "Software Engineer @ Celloscope Ltd."
date: "2026-02-27"
readTime: "10 min read"
category: "Database Architecture"
tags: ["PostgreSQL", "Partitioning", "Concurrency", "Database Internals", "Performance", "SQL"]
coverIcon: "Server"
gradient: "from-cyan-500/20 via-emerald-500/10 to-transparent"
---

# PostgreSQL Table Partitioning & Concurrency Control: Scaling Multi-Tenant Tables to 50M+ Rows

When relational database tables cross tens of millions of rows, monolithic B-Trees no longer fit in system RAM (`shared_buffers`), table maintenance operations like `VACUUM` take hours, and index scans experience significant cache eviction thrashing.

In enterprise multi-tenant systems, such as nationwide microfinance record platforms, **Declarative Table Partitioning** transforms a massive, unwieldy 80GB table into smaller, hyper-optimized 2GB physical child tables while maintaining a single, unified SQL interface.

In this engineering note, we explore declarative partitioning strategies, query execution plan pruning, and MVCC concurrency tuning in PostgreSQL.

---

## 1. Choosing a Partitioning Strategy: Range vs. List vs. Hash

PostgreSQL supports three primary partitioning methods:

| Partition Strategy | Partition Key Example | Best Production Use Case |
| :--- | :--- | :--- |
| **Range Partitioning** | `created_at` (Year/Month) | Timeseries data, financial audit logs, invoice histories |
| **List Partitioning** | `tenant_id` or `country_code` | Multi-tenant SaaS where tenants require physical data segregation |
| **Hash Partitioning** | `user_id` % modulus | Evenly spreading write load across multiple NVMe SSD disks |

```
                              ┌────────────────────────────────────────┐
                              │     orders (Declarative Partition)     │
                              └───────────────────┬────────────────────┘
                                                  │
                ┌─────────────────────────────────┼────────────────────────────────┐
                ▼                                 ▼                                ▼
┌───────────────────────────────┐ ┌───────────────────────────────┐ ┌───────────────────────────────┐
│ orders_2026_q1 (Jan - Mar)    │ │ orders_2026_q2 (Apr - Jun)    │ │ orders_2026_q3 (Jul - Sep)    │
│ - 3.2M rows, 280MB Index      │ │ - 4.1M rows, 350MB Index      │ │ - 3.8M rows, 320MB Index      │
│ - Entire Index fits in RAM!   │ │ - Entire Index fits in RAM!   │ │ - Entire Index fits in RAM!   │
└───────────────────────────────┘ └───────────────────────────────┘ └───────────────────────────────┘
```

---

## 2. Implementing Declarative Range Partitioning in SQL

Let's create an enterprise transaction ledger partitioned by calendar quarters:

```sql
-- 1. Create the parent partitioned table
CREATE TABLE customer_transactions (
    transaction_id UUID NOT NULL DEFAULT gen_random_uuid(),
    mfi_code VARCHAR(32) NOT NULL,
    account_number VARCHAR(64) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (transaction_id, created_at)
) PARTITION BY RANGE (created_at);

-- 2. Attach physical child partitions
CREATE TABLE transactions_2026_q1 PARTITION OF customer_transactions
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2026-04-01 00:00:00+00');

CREATE TABLE transactions_2026_q2 PARTITION OF customer_transactions
    FOR VALUES FROM ('2026-04-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');

CREATE TABLE transactions_default PARTITION OF customer_transactions DEFAULT;
```

---

## 3. Verifying Partition Pruning in Query Plans

**Partition Pruning** is the query planner optimization where PostgreSQL automatically ignores child tables that cannot contain matching rows based on the `WHERE` clause:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM customer_transactions
WHERE created_at >= '2026-02-01' AND created_at < '2026-02-15'
  AND mfi_code = 'BRAC_001';
```

### Execution Plan Result:

```text
Append  (cost=0.42..8.45 rows=1 width=128) (actual time=0.045..0.048 rows=12 loops=1)
  Buffers: shared hit=8
  ->  Index Scan using idx_t2026_q1_mfi on transactions_2026_q1
        Index Cond: ((mfi_code)::text = 'BRAC_001'::text)
        Filter: ((created_at >= '2026-02-01') AND (created_at < '2026-02-15'))
```

> **Why this matters:** Notice that `transactions_2026_q2` and `transactions_default` were never opened or scanned! Disk I/O was reduced by over 75%.

---

## 4. Mitigating MVCC Table Bloat & Tuning Autovacuum

In high-write databases, PostgreSQL's Multi-Version Concurrency Control (MVCC) creates a new row version (tuple) for every `UPDATE`, marking the old tuple as dead. Without aggressive autovacuuming, dead tuples bloat table pages on disk, slowing down sequential scans:

```sql
-- Per-table autovacuum configuration for hot transaction partitions
ALTER TABLE transactions_2026_q1 SET (
    autovacuum_vacuum_scale_factor = 0.05,     -- Trigger vacuum after 5% dead tuples (default is 20%)
    autovacuum_vacuum_cost_limit = 1000,       -- Increase I/O budget for vacuum worker
    autovacuum_vacuum_cost_delay = 2           -- Reduce sleep between disk page cycles
);
```

---

## 5. Preventing Concurrency Deadlocks on Distributed Updates

When concurrent Node.js microservices update multiple rows simultaneously (e.g. updating debit and credit balances in a double-entry ledger), differing row acquisition orders cause **Deadlocks (Error 40P01)**:

### ❌ Dangerous Unordered Lock Acquisition:
```sql
-- Thread A updates Account 101 then Account 205
-- Thread B updates Account 205 then Account 101 -> DEADLOCK!
```

### ✅ Safe Deterministic Sorting Lock Acquisition:
```sql
-- Always acquire row locks in consistent primary key order
SELECT id, balance 
FROM accounts 
WHERE id IN ('acc_101', 'acc_205')
ORDER BY id ASC
FOR UPDATE;
```

---

## Summary Checklist for PostgreSQL Architects

1. **Partition by Range on timestamps** for high-volume timeseries/financial records.
2. Ensure query `WHERE` clauses always include the **Partition Key** to enable partition pruning.
3. Keep the hot child partition's indexes small enough to fit completely in **PostgreSQL `shared_buffers`**.
4. Tune **Autovacuum scale factors** on write-heavy child partitions to avoid dead tuple bloat.
5. Always order `SELECT ... FOR UPDATE` row acquisitions deterministically by ID to prevent deadlocks.
