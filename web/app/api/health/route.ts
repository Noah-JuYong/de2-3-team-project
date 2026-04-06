import { httpRequestsTotal, httpRequestDurationSeconds } from '@/lib/metrics';

export async function GET() {
  const start = Date.now();
  const method = 'GET';
  const route = '/api/health';

  try {
    const response = Response.json(
      {
        status: "ok",
        service: "shopping-web",
      },
      { status: 200 },
    );

    // Update metrics
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({ method, route, status: '200' });
    httpRequestDurationSeconds.observe({ method, route }, duration);

    return response;
  } catch (err) {
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({ method, route, status: '500' });
    httpRequestDurationSeconds.observe({ method, route }, duration);
    
    throw err;
  }
}

