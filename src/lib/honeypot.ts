/**
 * Honeypot spam protection.
 *
 * How it works:
 *   A hidden input field (visually concealed via CSS, not `type="hidden"`)
 *   is added to the form. Legitimate users never see or interact with it,
 *   so it always arrives empty. Bots that auto-fill every field will
 *   populate it, revealing themselves.
 *
 * Why CSS-hidden instead of type="hidden":
 *   `type="hidden"` fields are well-known to bots and are often skipped.
 *   A visually hidden text input looks like a real field to a bot's DOM
 *   parser, making it a more effective trap.
 *
 * Field name: "website"
 *   A generic, plausible-sounding name that bots are likely to fill.
 *   Avoid names like "honeypot" or "trap" — bots check for those.
 */

export const HONEYPOT_FIELD = "website" as const;

/**
 * Returns true if the submission looks like a bot.
 * Call this server-side before any DB or email operations.
 */
export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  // Any non-empty value means a bot filled it in
  return typeof value === "string" && value.trim().length > 0;
}
