/** When review body exceeds this, show clamped text with Read more. */
export const REVIEW_BODY_CLAMP_CHARS = 200;

export function reviewBodyIsLong(body: string) {
  const text = body.trim();
  return text.length > REVIEW_BODY_CLAMP_CHARS;
}
