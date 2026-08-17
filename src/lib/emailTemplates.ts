import { unsubscribeUrl } from "./unsubscribe";

const WRAPPER_STYLE =
  "font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #3a2e26; background: #fffdf8;";

// No flexbox: email clients render it inconsistently (the earlier circle+wordmark layout came
// out misaligned in Gmail). Plain block text is reliable everywhere.
const LOGO_HEADER = `
  <p style="margin: 0 0 28px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">SL Studio</p>
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
