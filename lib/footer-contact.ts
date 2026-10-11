import type { FooterContent } from "./content-types";

/** Canonical phones — match ContactPage and legal-documents copy in content-types. */
export const CANONICAL_FOOTER_PHONES: FooterContent["phones"] = [
  { id: "p1", label: "+977 1 4518413", href: "tel:+97714518413" },
  { id: "p2", label: "+977 9851148898", href: "tel:+9779851148898" },
];

const PLACEHOLDER_PHONE_RE = /4000000|9800000000/;

export function isPlaceholderFooterPhone(phone: { label?: string; href?: string }) {
  const label = phone.label || "";
  const href = phone.href || "";
  return PLACEHOLDER_PHONE_RE.test(label) || PLACEHOLDER_PHONE_RE.test(href);
}

export function coerceFooterPhones(phones: FooterContent["phones"] | undefined): FooterContent["phones"] {
  if (!phones?.length) return CANONICAL_FOOTER_PHONES;
  if (phones.some(isPlaceholderFooterPhone)) return CANONICAL_FOOTER_PHONES;
  return phones;
}
