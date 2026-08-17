import { unsubscribeUrl } from "./unsubscribe";

const WRAPPER_STYLE =
  "font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #3a2e26; background: #fffdf8;";

const LOGO_HEADER = `
  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 28px;">
    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 9999px; border: 1px solid rgba(58, 46, 38, 0.25); font-family: monospace; font-size: 11px; font-weight: 600;">SL</span>
    <span style="font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">SL Studio</span>
  </div>
`;

export function newsletterWelcomeEmail(email: string): {
  subject: string;
  html: string;
  text: string;
} {
  const unsubscribe = unsubscribeUrl(email);
  return {
    subject: "Welcome to the SL Studio newsletter",
    html: `
      <div style="${WRAPPER_STYLE}">
        ${LOGO_HEADER}
        <p style="line-height: 1.6;">Hi, thanks for subscribing.</p>
        <p style="line-height: 1.6;">I'll email you when something new ships, an app, a feature, something worth telling you about. Nothing more often than that, and no noise in between.</p>
        <p style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #f2e8d5; font-size: 12px; color: #6b5c4d;">
          If it's ever not useful, <a href="${unsubscribe}" style="color: #6b5c4d;">unsubscribe here</a>.
        </p>
      </div>
    `,
    text: `Hi, thanks for subscribing.\n\nI'll email you when something new ships, an app, a feature, something worth telling you about. Nothing more often than that, and no noise in between.\n\nIf it's ever not useful, unsubscribe here: ${unsubscribe}`,
  };
}
