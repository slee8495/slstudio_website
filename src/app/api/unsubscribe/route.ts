import { Resend } from "resend";
import { NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

const audience = new Resend(process.env.RESEND_AUDIENCE_KEY);

const PAGE_STYLE =
  "font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 80px auto; padding: 0 24px; color: #3a2e26; text-align: center;";

function page(message: string) {
  return new NextResponse(
    `<!doctype html><html><body style="background:#fffdf8;"><div style="${PAGE_STYLE}"><p>${message}</p></div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

async function handleUnsubscribe(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return page("That unsubscribe link doesn't look right.");
  }

  try {
    const { error } = await audience.contacts.update({ email, unsubscribed: true });
    if (error) throw error;
  } catch (error) {
    console.error("Failed to unsubscribe", error);
    return page("Something went wrong. Try again, or email support@sl-studio.dev.");
  }

  return page("You're unsubscribed. Sorry to see you go.");
}

export async function GET(request: Request) {
  return handleUnsubscribe(request);
}

// Gmail/Outlook's native one-click "Unsubscribe" button sends a POST with
// List-Unsubscribe=One-Click to the same URL in the List-Unsubscribe header.
export async function POST(request: Request) {
  return handleUnsubscribe(request);
}
