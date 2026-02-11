import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as App.Locals).runtime;

  try {
    const data = await request.formData();

    // Honeypot check
    if (data.get('website')) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim().toLowerCase();
    const type = data.get('type')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    if (!name || !email || !type || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(runtime.env.RESEND_API_KEY);
    const contactEmail = runtime.env.CONTACT_EMAIL || 'hello@futureaupodcast.com.au';

    await resend.emails.send({
      from: `Future AU <noreply@futureaupodcast.com.au>`,
      to: contactEmail,
      replyTo: email,
      subject: `[Future AU] ${type}: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`,
    });

    return new Response(JSON.stringify({ ok: true, message: 'Message sent. Thanks for reaching out.' }), {
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
