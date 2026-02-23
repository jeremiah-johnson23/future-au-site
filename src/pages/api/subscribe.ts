import type { APIRoute } from 'astro';
import { Resend } from 'resend';

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

    // Send welcome email (non-blocking — don't fail the subscription if email fails)
    try {
      const resend = new Resend(runtime.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Future AU <simon@reflive.com>',
        to: email,
        subject: "You're in — welcome to Future AU",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
            <div style="background-color: #0a3a3a; padding: 32px; text-align: center;">
              <h1 style="font-size: 28px; margin: 0; color: #ffffff; letter-spacing: 0.05em;">
                FUTURE<span style="background-color: #f5c518; color: #0a3a3a; padding: 2px 8px; margin-left: 4px;">AU</span>
              </h1>
            </div>
            <div style="padding: 40px 32px; background-color: #ffffff;">
              <h2 style="font-size: 22px; margin: 0 0 16px; color: #0a3a3a;">You're on the list.</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Thanks for subscribing to Future AU. Before each episode drops, you'll get the research pack that built the conversation — the data, the graphs, the sources, and the questions that shaped the interview.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Our first episode is coming soon. You'll be the first to know.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
                — Simon
              </p>
            </div>
            <div style="background-color: #0a3a3a; padding: 24px 32px; text-align: center;">
              <p style="font-size: 12px; color: #7ab5b5; margin: 0;">
                You're receiving this because you signed up at
                <a href="https://futureaupodcast.com.au" style="color: #f5c518;">futureaupodcast.com.au</a>
              </p>
            </div>
          </div>
        `,
      });
    } catch {
      // Welcome email failed — subscription still saved, don't block the response
    }

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
