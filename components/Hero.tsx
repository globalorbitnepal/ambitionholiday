"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import HeroSearch from "@/components/HeroSearch";
import HeroStats from "@/components/HeroStats";
import HeroTagline from "@/components/HeroTagline";
import { useSiteContent } from "@/components/SiteContentProvider";

const DEFAULT_DESKTOP_VIDEO = "/videos/hero-bg.mp4";
const DEFAULT_MOBILE_VIDEO = "/videos/hero-bg-mobile.mp4";

export default function Hero() {
  const { hero } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(hero.videoSrc);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const src =
      mobile && hero.videoSrc === DEFAULT_DESKTOP_VIDEO
        ? DEFAULT_MOBILE_VIDEO
        : hero.videoSrc;
    setVideoSrc(src);
    const start = window.setTimeout(() => setShowVideo(true), 480);
    return () => window.clearTimeout(start);
  }, [hero.videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!showVideo || !video || !section) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");

    let inView = true;

    const sync = () => {
      if (inView && !document.hidden) {
        const play = video.play();
        if (play) play.catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.08 },
    );
    io.observe(section);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);
    video.addEventListener("canplay", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("canplay", sync);
      video.pause();
    };
  }, [showVideo, videoSrc]);

  if (!hero.visible) return null;

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100dvh] w-full flex-col overflow-x-clip bg-black"
    >
      <MediaImage
        src={hero.posterSrc}
        alt=""
        priority
        sizes="100vw"
        objectPosition="center 28%"
        className="pointer-events-none object-cover sm:object-center"
      />
      {showVideo ? (
        <video
          ref={videoRef}
          key={videoSrc}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_28%] sm:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={hero.posterSrc}
          aria-hidden="true"
          src={videoSrc}
        />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      <div className="hero-copy relative z-0 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(6rem,calc(env(safe-area-inset-top)+4.5rem))] sm:pt-28 lg:pb-8 lg:pt-24">
          <div className="relative w-full max-w-5xl">
            <div className="relative">
              <HeroTagline words={hero.taglineWords} />

              <h1 className="animate-fade-up-delay-1 mb-7 px-1 text-center font-sans text-[clamp(1.85rem,7.2vw,3.9rem)] font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:mb-8 lg:whitespace-nowrap">
                {hero.headline}
              </h1>

              <HeroSearch placeholder={hero.searchPlaceholder} />
            </div>
          </div>
        </div>

        {hero.statsVisible ? <HeroStats stats={hero.stats} /> : null}
      </div>

      <Header />
    </section>
  );
}
