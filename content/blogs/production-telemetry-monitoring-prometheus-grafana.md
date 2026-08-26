---
title: "Production Telemetry & Observability: Monitoring Microservices with Prometheus, Grafana & Node Exporter"
slug: "production-telemetry-monitoring-prometheus-grafana"
excerpt: "A practical guide to implementing the Four Golden Signals of observability, configuring Prometheus metric scrapers in Docker clusters, and building actionable Grafana dashboards."
author: "Nahid Karim Ankur"
role: "Software Engineer @ Celloscope Ltd."
date: "2026-02-18"
readTime: "8 min read"
category: "DevOps & Observability"
tags: ["DevOps", "Prometheus", "Grafana", "Observability", "Monitoring", "Docker"]
coverIcon: "Gauge"
gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent"
---

# Production Telemetry & Observability: Monitoring Microservices with Prometheus, Grafana & Node Exporter

*"You cannot improve or defend what you do not measure."*

When distributed microservices run in multi-container production clusters, relying on manual SSH inspections and ad-hoc log files during an outage is a recipe for extended downtime. To achieve high operational reliability (99.9% uptime SLA), engineering teams require automated telemetry: real-time metric scraping, intelligent alert thresholds, and centralized visual dashboards.

In this engineering note, we walk through configuring end-to-end production monitoring using **Prometheus**, **Grafana**, and **Node Exporter** within containerized microservice architectures.

---

## 1. The Four Golden Signals of Observability

Google's SRE framework defines the four critical signals every distributed backend service must monitor:

1. **Latency:** The duration it takes to serve a request (tracking p50, p95, and p99 percentiles).
2. **Traffic:** The demand placed on the system (e.g., HTTP requests per second, active database transactions).
3. **Errors:** The rate of requests that fail explicitly (HTTP 5xx, uncaught Node.js exceptions).
4. **Saturation:** The resource utilization of the system (CPU load, memory pressure, connection pool exhaustion).

```
┌─────────────────────────────────────────────────────────────┐
│                   OBSERVABILITY PIPELINE                    │
│                                                             │
│   Node.js API Cluster        Linux Host & Swarm Nodes       │
│  [ /metrics endpoint ]          [ Node Exporter ]           │
│           │                             │                   │
│           ▼                             ▼                   │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              Prometheus Time-Series DB              │   │
│   │            (Scraping intervals: 15s)                │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│                ┌─────────────┴─────────────┐                │
│                ▼                           ▼                │
│       Grafana Dashboards           Alertmanager             │
│    (Real-time Visual Health)    (Slack / Email / SMS Alerts)│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Instrumenting Node.js Microservices with `prom-client`

To expose runtime performance metrics to Prometheus, integrate `prom-client` in your Express or NestJS applications:

```typescript
// src/telemetry/metrics.service.ts
import client from "prom-client";

// Collect standard Node.js V8 runtime metrics (Memory heap, event loop lag, GC)
client.collectDefaultMetrics({ prefix: "celloscope_core_" });

// Custom Histogram for measuring HTTP request durations
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2.5, 5],
});

// Expose scraping endpoint for Prometheus
export function setupMetricsEndpoint(app: any) {
  app.get("/metrics", async (req: any, res: any) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  });
}
```

---

## 3. Configuring Prometheus Scrape Targets

In your `prometheus.yml` configuration file, configure automated discovery for your application services and host monitoring agents:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # 1. Microservices API Scrape Target
  - job_name: "celloscope-backend-api"
    metrics_path: "/metrics"
    static_configs:
      - targets: ["api_gateway:8080", "worker_cluster:8081"]

  # 2. Host Level Hardware Metrics (CPU, RAM, Disk I/O)
  - job_name: "node-exporter"
    static_configs:
      - targets: ["node_exporter:9100"]

  # 3. PostgreSQL Database Exporter
  - job_name: "postgres-exporter"
    static_configs:
      - targets: ["postgres_exporter:9187"]
```

---

## 4. Key PromQL Queries for Production Dashboards

Writing efficient PromQL queries is essential for setting up actionable Grafana panels:

### Calculating p99 Response Latency:
```promql
histogram_quantile(
  0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route)
)
```

### Calculating Request Error Rate (%):
```promql
(
  sum(rate(http_request_duration_seconds_count{status_code=~"5.."}[5m]))
  /
  sum(rate(http_request_duration_seconds_count[5m]))
) * 100
```

### Memory Leak & Heap Utilization Detection:
```promql
(celloscope_core_nodejs_heap_size_used_bytes / celloscope_core_nodejs_heap_size_total_bytes) * 100
```

---

## 5. Setting Up Proactive Production Alerts

Never wait for users to report outages. Configure alert rules in Prometheus `alert.rules.yml`:

```yaml
groups:
  - name: celloscope_critical_alerts
    rules:
      - alert: HighEventLoopLag
        expr: celloscope_core_nodejs_eventloop_lag_seconds > 0.25
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Node.js Event Loop Lag Exceeds 250ms on instance {{ $labels.instance }}"
          description: "Service is experiencing high CPU thread contention. Immediate investigation required."
```

---

## Summary & Best Practices

- **Set granular histogram buckets:** Standard default buckets often miss subtle latency regressions between 50ms and 200ms.
- **Isolate metrics endpoints:** Restrict access to `/metrics` via internal network firewalls or basic auth so sensitive telemetry is not public.
- **Alert on symptoms, not causes:** Alerting on high error rates and high p99 latency ensures on-call engineers are notified when users are genuinely impacted.
