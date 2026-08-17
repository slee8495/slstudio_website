import { createHmac, timingSafeEqual } from "crypto";

// A lightweight signed token (not full auth) so the unsubscribe link can't be used to silently
// unsubscribe an arbitrary email address just by guessing it.
export function unsubscribeToken(email: string): string {
  return createHmac("sha256", process.env.UNSUBSCRIBE_SECRET!)
    .update(email.toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = unsubscribeToken(email);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function unsubscribeUrl(email: string): string {
  const params = new URLSearchParams({ email, token: unsubscribeToken(email) });
  return `https://sl-studio.dev/api/unsubscribe?${params.toString()}`;
}
