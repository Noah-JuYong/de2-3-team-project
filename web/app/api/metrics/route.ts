import { register, httpRequestsTotal, httpRequestDurationSeconds } from '@/lib/metrics';

export async function GET() {
  try {
    const metrics = await register.metrics();
    return new Response(metrics, {
      status: 200,
      headers: {
        'Content-Type': register.contentType,
      },
    });
  } catch (err) {
    console.error('Error collecting metrics:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Middleware or wrapper logic is needed for automatic instrumentation.
// For this demo, we will manually call these in routes.
export { httpRequestsTotal, httpRequestDurationSeconds };
