"use client";

import { useState } from "react";
import {
  DEFAULT_CONTENT,
  type JournalVideo,
  type SiteContent,
} from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";
import { OrbitMediaButtons } from "@/components/OrbitMediaPicker";
import { postOrbitUpload } from "@/lib/orbit-upload-client";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

async function uploadFile(file: File): Promise<string> {
  return postOrbitUpload(file);
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitJournalEditor({ content, setContent, save }: Props) {
  const journal = content.journal ?? DEFAULT_CONTENT.journal;
  const [busy, setBusy] = useState<string | null>(null);

  function patch(partial: Partial<SiteContent["journal"]>) {
    setContent({ ...content, journal: { ...journal, ...partial } });
  }

  function updateVideo(index: number, next: JournalVideo) {
    const videos = [...journal.videos];
    videos[index] = next;
    patch({ videos });
  }

  async function saveVideo(index: number, nextVideo: JournalVideo) {
    const videos = [...journal.videos];
    videos[index] = nextVideo;
    const next = { ...content, journal: { ...journal, videos } };
    setContent(next);
    await save(next);
  }

  async function replaceThumb(index: number, file: File) {
    setBusy(`thumb-${index}`);
    try {
      const url = await uploadFile(file);
      const videos = [...journal.videos];
      videos[index] = { ...videos[index], imageSrc: url };
      const next = { ...content, journal: { ...journal, videos } };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Thumbnail upload failed. Try a JPG or PNG under 12MB.");
    } finally {
      setBusy(null);
    }
  }

  async function replaceVideo(index: number, file: File) {
    setBusy(`video-${index}`);
    try {
      const url = await uploadFile(file);
      const videos = [...journal.videos];
      videos[index] = { ...videos[index], videoSrc: url };
      const next = { ...content, journal: { ...journal, videos } };
      setContent(next);
      await save(next);
    } catch {
      window.alert("Video upload failed. Try an MP4 under 32MB.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 p-3 text-[0.8rem] text-white/70">
        Video Journal edits (YouTube/Vimeo link, thumbnail, title, time) are saved to the server and
        <strong className="text-white/90"> stay after deploy</strong>. After typing a link or text,
        click outside the field or press <strong className="text-white/90">Save changes</strong>.
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={journal.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Video Journal section
      </label>

      <Field label="Eyebrow">
        <input
          className={inputClass}
          value={journal.eyebrow}
          onChange={(e) => patch({ eyebrow: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Headline before">
          <input
            className={inputClass}
            value={journal.headlineBefore}
            onChange={(e) => patch({ headlineBefore: e.target.value })}
          />
        </Field>
        <Field label="Headline gold">
          <input
            className={inputClass}
            value={journal.headlineGold}
            onChange={(e) => patch({ headlineGold: e.target.value })}
          />
        </Field>
        <Field label="Headline after">
          <input
            className={inputClass}
            value={journal.headlineAfter}
            onChange={(e) => patch({ headlineAfter: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea
          className={`${inputClass} min-h-20`}
          value={journal.body}
          onChange={(e) => patch({ body: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button label">
          <input
            className={inputClass}
            value={journal.ctaLabel}
            onChange={(e) => patch({ ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="Button link">
          <input
            className={inputClass}
            value={journal.ctaHref}
            onChange={(e) => patch({ ctaHref: e.target.value })}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Video cards
        </p>
        <div className="space-y-5">
          {journal.videos.map((video, index) => (
            <div key={video.id} className="space-y-3 rounded-lg border border-white/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-gold">Video {index + 1}</p>
                <button
                  type="button"
                  className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                  onClick={() =>
                    patch({ videos: journal.videos.filter((_, i) => i !== index) })
                  }
                >
                  Remove
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-md bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaSrc(video.imageSrc, content.updatedAt)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <OrbitMediaButtons
                onPicked={async (url) => {
                  const videos = [...journal.videos];
                  videos[index] = { ...video, imageSrc: url };
                  const next = { ...content, journal: { ...journal, videos } };
                  setContent(next);
                  await save(next);
                }}
              />
              <OrbitMediaButtons
                kind="video"
                onPicked={async (url) => {
                  const videos = [...journal.videos];
                  videos[index] = { ...video, videoSrc: url };
                  const next = { ...content, journal: { ...journal, videos } };
                  setContent(next);
                  await save(next);
                }}
              />
              <div className="flex flex-wrap gap-2">
                <label
                  className={`inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold ${
                    busy === `thumb-${index}` ? "opacity-50" : ""
                  }`}
                >
                  {busy === `thumb-${index}` ? "Uploading…" : "Replace thumbnail"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={busy !== null}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      await replaceThumb(index, file);
                    }}
                  />
                </label>
                <label
                  className={`inline-flex cursor-pointer rounded-md border border-emerald-400/40 px-3 py-2 text-xs font-semibold text-emerald-300 ${
                    busy === `video-${index}` ? "opacity-50" : ""
                  }`}
                >
                  {busy === `video-${index}` ? "Uploading…" : "Upload MP4 video"}
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                    className="hidden"
                    disabled={busy !== null}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      await replaceVideo(index, file);
                    }}
                  />
                </label>
              </div>
              <Field label="Video link (YouTube / Vimeo / uploaded path)">
                <input
                  className={inputClass}
                  value={video.videoSrc}
                  placeholder="https://www.youtube.com/watch?v=…  or  https://vimeo.com/…  or  /uploads/…"
                  onChange={(e) => updateVideo(index, { ...video, videoSrc: e.target.value })}
                  onBlur={(e) =>
                    void saveVideo(index, { ...video, videoSrc: e.target.value })
                  }
                />
              </Field>
              <p className="text-[0.65rem] text-white/40">
                Card click opens a same-page fullscreen player. Paste YouTube/Vimeo link, or upload MP4.
                Link/title/time auto-save when you leave the field.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={video.title}
                    onChange={(e) => updateVideo(index, { ...video, title: e.target.value })}
                    onBlur={(e) =>
                      void saveVideo(index, { ...video, title: e.target.value })
                    }
                  />
                </Field>
                <Field label="Subtitle">
                  <input
                    className={inputClass}
                    value={video.subtitle}
                    onChange={(e) => updateVideo(index, { ...video, subtitle: e.target.value })}
                    onBlur={(e) =>
                      void saveVideo(index, { ...video, subtitle: e.target.value })
                    }
                  />
                </Field>
                <Field label="Duration label">
                  <input
                    className={inputClass}
                    value={video.duration}
                    onChange={(e) => updateVideo(index, { ...video, duration: e.target.value })}
                    onBlur={(e) =>
                      void saveVideo(index, { ...video, duration: e.target.value })
                    }
                  />
                </Field>
                <Field label="Image alt">
                  <input
                    className={inputClass}
                    value={video.imageAlt}
                    onChange={(e) => updateVideo(index, { ...video, imageAlt: e.target.value })}
                    onBlur={(e) =>
                      void saveVideo(index, { ...video, imageAlt: e.target.value })
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 rounded-md border border-white/20 px-3 py-2 text-xs"
          onClick={() =>
            patch({
              videos: [
                ...journal.videos,
                {
                  id: `vid-${Date.now()}`,
                  title: "New journey video",
                  subtitle: "Days Journey",
                  duration: "00:00",
                  imageSrc: DEFAULT_CONTENT.journal.videos[0].imageSrc,
                  imageAlt: "Journey video thumbnail",
                  videoSrc: "",
                },
              ],
            })
          }
        >
          Add video card
        </button>
      </div>
    </div>
  );
}
