import { Resend } from "resend";
import { NextResponse } from "next/server";
import { newsletterWelcomeEmail } from "@/lib/emailTemplates";
import { unsubscribeUrl } from "@/lib/unsubscribe";

// Two separate keys, on purpose: audience management (contacts.create below) needs Full access,
// but sending the welcome email only needs the same send-only key the contact form already uses.
const audience = new Resend(process.env.RESEND_AUDIENCE_KEY);
const sender = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { email, company } = body as {
    email?: string;
    company?: string; // honeypot field, real visitors never fill this in
  };

  if (company) {
    // Bot filled the hidden field. Pretend success so it doesn't learn to skip it.
    return NextResponse.json({ ok: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("RESEND_AUDIENCE_ID is not configured");
    return NextResponse.json(
      { ok: false, error: "Something went wrong subscribing you." },
      { status: 500 }
    );
  }

  try {
    const { error } = await audience.contacts.create({
      email,
      segments: [{ id: audienceId }],
    });
    if (error) throw error;
  } catch (error) {
    console.error("Failed to subscribe", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong subscribing you." },
      { status: 500 }
    );
  }

  try {
    const { subject, html, text } = newsletterWelcomeEmail(email);
    await sender.emails.send({
      from: "SL Studio <noreply@sl-studio.dev>",
      to: email,
      subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl(email)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
  } catch (error) {
    // The contact is already saved, so don't fail the request over a welcome-email hiccup.
    console.error("Failed to send newsletter welcome email", error);
  }

  return NextResponse.json({ ok: true });
}
