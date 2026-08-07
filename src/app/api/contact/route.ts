import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, company } = body as {
    name?: string;
    email?: string;
    message?: string;
    company?: string; // honeypot field, real visitors never fill this in
  };

  if (company) {
    // Bot filled the hidden field. Pretend success so it doesn't learn to skip it.
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "SL Studio <noreply@sl-studio.dev>",
      to: "support@sl-studio.dev",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
