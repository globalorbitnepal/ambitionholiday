export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ambition.theglobalorbit.com").replace(/\/$/, "");
export const SITE_NAME = "Ambition Holidays";

export function absoluteUrl(path: string) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function splitKeywords(value: string | string[] | undefined) {
  const list = Array.isArray(value) ? value : (value || "").split(",");
  return list.map((item) => item.trim()).filter(Boolean);
}

export type SeoStatus = "good" | "ok" | "bad";

export type SeoCheck = {
  id: string;
  label: string;
  status: SeoStatus;
};

export type SeoInput = {
  focusKeyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  /** Intro paragraph shown first on the page. */
  intro: string;
  /** All readable body text. */
  body: string;
  headings: string[];
  imageSrc: string;
  imageAlt: string;
};

export type SeoResult = {
  score: number;
  checks: SeoCheck[];
  wordCount: number;
  titleUsed: string;
  descriptionUsed: string;
};

export const META_TITLE_RANGE = { min: 30, max: 60 } as const;
export const META_DESC_RANGE = { min: 120, max: 160 } as const;

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function contains(haystack: string, keyword: string) {
  const k = normalize(keyword);
  return Boolean(k) && ` ${normalize(haystack)} `.includes(` ${k} `);
}

function countWords(text: string) {
  const n = normalize(text);
  return n ? n.split(" ").length : 0;
}

function countOccurrences(text: string, keyword: string) {
  const k = normalize(keyword);
  if (!k) return 0;
  const words = ` ${normalize(text)} `;
  let count = 0;
  let from = 0;
  const needle = ` ${k} `;
  for (;;) {
    const at = words.indexOf(needle, from);
    if (at === -1) break;
    count += 1;
    from = at + needle.length - 1;
  }
  return count;
}

function rangeStatus(length: number, range: { min: number; max: number }): SeoStatus {
  if (length >= range.min && length <= range.max) return "good";
  if (length >= range.min - 15 && length <= range.max + 15) return "ok";
  return "bad";
}

export function analyzeSeo(input: SeoInput): SeoResult {
  const keyword = input.focusKeyword.trim();
  const titleUsed = (input.metaTitle || input.title).trim();
  const descriptionUsed = (input.metaDescription || input.intro).trim();
  const fullText = [input.intro, input.body, ...input.headings].join(" ");
  const wordCount = countWords(fullText);
  const checks: SeoCheck[] = [];
  const add = (id: string, label: string, status: SeoStatus) => checks.push({ id, label, status });

  if (!keyword) {
    add("kw", "Set a focus keyword (the main search phrase for this page).", "bad");
  } else {
    add("kw", `Focus keyword: “${keyword}”.`, "good");

    const inTitle = contains(titleUsed, keyword);
    const startsTitle = normalize(titleUsed).startsWith(normalize(keyword));
    add(
      "kw-title",
      inTitle
        ? startsTitle
          ? "Focus keyword starts the SEO title."
          : "Focus keyword is in the SEO title (better near the start)."
        : "Add the focus keyword to the SEO title.",
      inTitle ? (startsTitle ? "good" : "ok") : "bad",
    );

    add(
      "kw-desc",
      contains(descriptionUsed, keyword)
        ? "Focus keyword appears in the meta description."
        : "Add the focus keyword to the meta description.",
      contains(descriptionUsed, keyword) ? "good" : "bad",
    );

    const slugWords = normalize(keyword).split(" ").filter((word) => word.length > 2);
    const slug = input.slug.toLowerCase();
    const slugHits = slugWords.filter((word) => slug.includes(word)).length;
    add(
      "kw-slug",
      slugHits === slugWords.length
        ? "Focus keyword is in the URL slug."
        : slugHits > 0
          ? "URL slug has part of the focus keyword."
          : "Put the focus keyword in the URL slug.",
      slugHits === slugWords.length ? "good" : slugHits > 0 ? "ok" : "bad",
    );

    add(
      "kw-intro",
      contains(input.intro, keyword)
        ? "Focus keyword appears in the introduction."
        : "Use the focus keyword in the first paragraph.",
      contains(input.intro, keyword) ? "good" : "bad",
    );

    const inHeading = input.headings.some((heading) => contains(heading, keyword));
    add(
      "kw-heading",
      inHeading ? "Focus keyword is used in a subheading." : "Use the focus keyword in at least one subheading.",
      inHeading ? "good" : input.headings.length ? "ok" : "bad",
    );

    const occurrences = countOccurrences(fullText, keyword);
    const density = wordCount ? (occurrences * countWords(keyword) * 100) / wordCount : 0;
    add(
      "kw-density",
      `Keyword density ${density.toFixed(1)}% (${occurrences}×). Aim for 0.5–3%.`,
      density >= 0.5 && density <= 3 ? "good" : density > 0 && density <= 4 ? "ok" : "bad",
    );

    add(
      "kw-alt",
      contains(input.imageAlt, keyword)
        ? "Cover image alt text includes the focus keyword."
        : "Add the focus keyword to the cover image alt text.",
      contains(input.imageAlt, keyword) ? "good" : input.imageAlt.trim() ? "ok" : "bad",
    );
  }

  add(
    "title-len",
    `SEO title is ${titleUsed.length} characters (best ${META_TITLE_RANGE.min}–${META_TITLE_RANGE.max}).`,
    rangeStatus(titleUsed.length, META_TITLE_RANGE),
  );
  add(
    "desc-len",
    `Meta description is ${descriptionUsed.length} characters (best ${META_DESC_RANGE.min}–${META_DESC_RANGE.max}).`,
    input.metaDescription.trim() ? rangeStatus(descriptionUsed.length, META_DESC_RANGE) : "bad",
  );
  add(
    "words",
    `Content has ${wordCount} words (600+ is strong for search).`,
    wordCount >= 600 ? "good" : wordCount >= 300 ? "ok" : "bad",
  );
  add(
    "image",
    input.imageSrc ? (input.imageAlt.trim() ? "Cover image with alt text." : "Cover image is missing alt text.") : "Add a cover image.",
    input.imageSrc ? (input.imageAlt.trim() ? "good" : "ok") : "bad",
  );
  const cleanSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug);
  add(
    "slug",
    !input.slug
      ? "Set a URL slug."
      : !cleanSlug
        ? "Slug should be lowercase words joined by hyphens."
        : input.slug.length > 75
          ? "Slug is long — keep it under 75 characters."
          : "Clean, readable URL slug.",
    !input.slug || !cleanSlug ? "bad" : input.slug.length > 75 ? "ok" : "good",
  );

  const points = checks.reduce((sum, check) => sum + (check.status === "good" ? 1 : check.status === "ok" ? 0.5 : 0), 0);
  const score = checks.length ? Math.round((points / checks.length) * 100) : 0;
  return { score, checks, wordCount, titleUsed, descriptionUsed };
}

export function seoScoreTone(score: number): SeoStatus {
  if (score >= 80) return "good";
  if (score >= 50) return "ok";
  return "bad";
}

export function slugify(value: string, max = 80) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, max)
    .replace(/-$/, "");
}
