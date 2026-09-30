"use client";

import { useMemo } from "react";
import {
  absoluteUrl,
  analyzeSeo,
  META_DESC_RANGE,
  META_TITLE_RANGE,
  seoScoreTone,
  type SeoInput,
  type SeoStatus,
} from "@/lib/seo";

const TONE: Record<SeoStatus, string> = {
  good: "#1f9d55",
  ok: "#d49a12",
  bad: "#d64545",
};

const TONE_LABEL: Record<SeoStatus, string> = {
  good: "Good",
  ok: "Needs work",
  bad: "Poor",
};

type Theme = "light" | "dark";

function palette(theme: Theme) {
  return theme === "dark"
    ? { card: "rgba(0,0,0,0.3)", border: "rgba(255,255,255,0.12)", text: "#f2efe8", muted: "rgba(242,239,232,0.6)", snippet: "#ffffff" }
    : { card: "#ffffff", border: "#dfe4ea", text: "#1d2530", muted: "#667084", snippet: "#ffffff" };
}

function clip(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** Character counter used under SEO title / description inputs. */
export function SeoLengthHint({
  value,
  kind,
  theme = "light",
}: {
  value: string;
  kind: "title" | "description";
  theme?: Theme;
}) {
  const range = kind === "title" ? META_TITLE_RANGE : META_DESC_RANGE;
  const length = value.trim().length;
  const status: SeoStatus =
    length >= range.min && length <= range.max ? "good" : length > 0 && length <= range.max + 15 ? "ok" : "bad";
  const width = Math.min(100, Math.round((length / range.max) * 100));
  return (
    <span style={{ display: "block", marginTop: 6 }}>
      <span style={{ display: "block", height: 4, borderRadius: 4, background: palette(theme).border, overflow: "hidden" }}>
        <span style={{ display: "block", height: "100%", width: `${width}%`, background: TONE[status] }} />
      </span>
      <small style={{ color: palette(theme).muted, fontSize: 12 }}>
        {length} / {range.max} characters · best {range.min}–{range.max}
      </small>
    </span>
  );
}

export default function SeoPanel({
  input,
  path,
  ogTitle,
  ogDescription,
  ogImageSrc,
  theme = "light",
}: {
  input: SeoInput;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageSrc?: string;
  theme?: Theme;
}) {
  const result = useMemo(() => analyzeSeo(input), [input]);
  const tone = seoScoreTone(result.score);
  const colors = palette(theme);
  const url = absoluteUrl(path);
  const socialTitle = ogTitle?.trim() || result.titleUsed;
  const socialDesc = ogDescription?.trim() || result.descriptionUsed;
  const socialImage = ogImageSrc?.trim() || input.imageSrc;
  const ordered = [...result.checks].sort((a, b) => {
    const rank = { bad: 0, ok: 1, good: 2 } as const;
    return rank[a.status] - rank[b.status];
  });

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        background: colors.card,
        color: colors.text,
        padding: 16,
        display: "grid",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          aria-label={`SEO score ${result.score} of 100`}
          style={{
            width: 64,
            height: 64,
            flexShrink: 0,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: `conic-gradient(${TONE[tone]} ${result.score * 3.6}deg, ${colors.border} 0deg)`,
          }}
        >
          <span
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: colors.card,
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            {result.score}
          </span>
        </div>
        <div>
          <strong style={{ display: "block", fontSize: 16 }}>SEO score: {TONE_LABEL[tone]}</strong>
          <small style={{ color: colors.muted }}>
            {result.wordCount} words · fix red items first, then orange.
          </small>
        </div>
      </div>

      <div>
        <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: colors.muted }}>
          GOOGLE PREVIEW
        </p>
        <div style={{ background: colors.snippet, border: "1px solid #e3e7ec", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ color: "#202124", fontSize: 12, marginBottom: 2, wordBreak: "break-all" }}>{url}</div>
          <div style={{ color: "#1a0dab", fontSize: 18, lineHeight: 1.3, marginBottom: 4 }}>
            {clip(result.titleUsed || "Page title", 62)}
          </div>
          <div style={{ color: "#4d5156", fontSize: 13, lineHeight: 1.5 }}>
            {clip(result.descriptionUsed || "Write a meta description so Google shows a clear summary.", 162)}
          </div>
        </div>
      </div>

      <div>
        <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: colors.muted }}>
          SOCIAL SHARE PREVIEW (FACEBOOK / WHATSAPP)
        </p>
        <div style={{ border: "1px solid #e3e7ec", borderRadius: 10, overflow: "hidden", background: "#fff", maxWidth: 420 }}>
          {socialImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={socialImage} alt="" style={{ display: "block", width: "100%", aspectRatio: "1.91 / 1", objectFit: "cover" }} />
          ) : (
            <div style={{ aspectRatio: "1.91 / 1", background: "#eef2f6" }} />
          )}
          <div style={{ padding: "8px 12px", background: "#f0f2f5" }}>
            <div style={{ color: "#65676b", fontSize: 11, textTransform: "uppercase" }}>
              {url.replace(/^https?:\/\//, "").split("/")[0]}
            </div>
            <div style={{ color: "#050505", fontWeight: 700, fontSize: 15 }}>{clip(socialTitle || "Title", 80)}</div>
            <div style={{ color: "#65676b", fontSize: 13 }}>{clip(socialDesc, 110)}</div>
          </div>
        </div>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
        {ordered.map((check) => (
          <li key={check.id} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14 }}>
            <span
              aria-label={TONE_LABEL[check.status]}
              style={{
                width: 10,
                height: 10,
                marginTop: 5,
                flexShrink: 0,
                borderRadius: "50%",
                background: TONE[check.status],
              }}
            />
            <span>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
