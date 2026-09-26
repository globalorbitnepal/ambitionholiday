"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { TrekVideo } from "@/lib/trip-packages";
import { mediaSrc } from "@/lib/media-src";
import {
  isFileVideo,
  normalizeVideoSrc,
  vimeoEmbedSrc,
  vimeoId,
  youtubeEmbedSrc,
  youtubeId,
} from "@/lib/video-embed";

export default function TrekVideoLightbox({ video, onClose }: { video: TrekVideo; onClose: () => void }) {
  const titleId = useId();
  const src = normalizeVideoSrc(video.videoSrc);
  const yt = youtubeId(src);
  const vimeo = vimeoId(src);
  const file = isFileVideo(src);
  const [mounted, setMounted] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://ambition.theglobalorbit.com";

  useEffect(() => {
    setMounted(true);
  }, []);

  const stopPlayback = useCallback(() => {
    const el = frameRef.current;
    if (el) {
      try {
        el.contentWindow?.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
      } catch {
        // ignore cross-origin
      }
      el.src = "about:blank";
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      stopPlayback();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, stopPlayback]);

  if (!mounted) return null;

  const embedKey = yt || vimeo || src || video.id;

  return createPortal(
    <div
      className="trek-video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button type="button" className="trek-video-lightbox-close" onClick={onClose}>
        Close
      </button>
      <div className="trek-video-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <header className="trek-video-lightbox-head">
          <p id={titleId} className="trek-video-lightbox-title">{video.title}</p>
          {video.subtitle ? <p className="trek-video-lightbox-sub">{video.subtitle}</p> : null}
          {video.duration ? <span className="trek-video-lightbox-dur">{video.duration}</span> : null}
        </header>
        <div className="trek-video-lightbox-frame">
          {yt ? (
            <iframe
              ref={frameRef}
              key={embedKey}
              title={video.title}
              src={youtubeEmbedSrc(yt, origin)}
              className="trek-video-lightbox-media"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : vimeo ? (
            <iframe
              key={embedKey}
              title={video.title}
              src={vimeoEmbedSrc(vimeo)}
              className="trek-video-lightbox-media"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : file ? (
            <video
              key={embedKey}
              className="trek-video-lightbox-media trek-video-lightbox-file"
              src={mediaSrc(src)}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <div className="trek-video-lightbox-empty">
              <p>Video link could not be loaded. Check the YouTube URL in Admin → Packages → Video.</p>
              {src ? <code>{src}</code> : null}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
