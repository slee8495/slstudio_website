import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_AUDIENCE_KEY);

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
    const { error } = await resend.contacts.create({
      email,
      segments: [{ id: audienceId }],
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to subscribe", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong subscribing you." },
      { status: 500 }
    );
  }
}
