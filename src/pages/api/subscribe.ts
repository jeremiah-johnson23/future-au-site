import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as App.Locals).runtime;
  const kv = runtime.env.SUBSCRIBERS_KV;

  try {
    const data = await request.formData();

    // Honeypot check
    if (data.get('website')) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const email = data.get('email')?.toString().trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existing = await kv.get(`sub:${email}`);
    if (existing) {
      return new Response(JSON.stringify({ ok: true, message: "You're already on the list." }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await kv.put(`sub:${email}`, JSON.stringify({
      email,
      subscribedAt: new Date().toISOString(),
    }));

    return new Response(JSON.stringify({ ok: true, message: "You're in. We'll be in touch." }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Something went wrong. Try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
