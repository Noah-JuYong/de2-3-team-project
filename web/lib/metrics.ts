import { Registry, collectDefaultMetrics, Counter, Histogram } from 'prom-client';

// Create a new registry to avoid global state issues in development
const register = new Registry();

// 1. Collect default metrics (CPU, Memory, etc.)
collectDefaultMetrics({ register });

// 2. Define custom metrics
// Counter: tracks the number of requests
export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Histogram: tracks request duration (latency)
export const httpRequestDurationSeconds = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 10], // standard buckets
  registers: [register],
});

export { register };
