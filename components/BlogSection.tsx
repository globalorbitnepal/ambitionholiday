"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import type { BlogPost } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 3.8v3.2M16 3.8v3.2M4 9.5h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 8.2V12l2.6 2.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FeaturedCard({ post, updatedAt }: { post: BlogPost; updatedAt: string }) {
  return (
    <article className="hl-card group flex flex-col overflow-hidden rounded-[0.9rem] border border-gold/30">
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        <MediaImage
          src={post.imageSrc}
          alt={post.imageAlt}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-105"
        />
        {post.badge && post.badgeStyle !== "none" ? (
          <div className="absolute left-3 top-3 z-[1]">
            <span
              className={
                post.badgeStyle === "featured"
                  ? "inline-flex items-center rounded-full bg-gold px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#1a1f27]"
                  : "inline-flex items-center rounded-full border border-white/55 bg-black/45 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white/95 backdrop-blur-sm"
              }
            >
              {post.badge}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        {post.category ? (
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold">{post.category}</p>
        ) : null}
        <h3 className="font-[family-name:var(--font-cormorant)] text-[1.28rem] font-semibold leading-snug text-white sm:text-[1.45rem]">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="line-clamp-3 text-[0.84rem] leading-relaxed text-white/78 sm:text-[0.9rem]">{post.excerpt}</p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-1">
          <div className="flex min-w-0 items-center gap-2.5">
            {post.authorAvatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaSrc(post.authorAvatarSrc)}
                alt=""
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="h-8 w-8 rounded-full border border-white/25 object-cover bg-black/40"
              />
            ) : null}
            <div className="min-w-0 text-[0.72rem] text-white/80">
              {post.authorName ? <p className="font-medium text-white">{post.authorName}</p> : null}
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-white/65">
                <span>{post.date}</span>
                {post.readTime ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon />
                      {post.readTime}
                    </span>
                  </>
                ) : null}
              </p>
            </div>
          </div>
          <Link
            href={post.href || "#"}
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md bg-gold px-3.5 py-2.5 text-[0.72rem] font-semibold tracking-wide text-[#1a1f27] transition-colors hover:bg-[#d4b45a]"
          >
            Read More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SidePostRow({ post, updatedAt }: { post: BlogPost; updatedAt: string }) {
  return (
    <Link
      href={post.href || "#"}
      className="group flex gap-3 rounded-lg border border-gold/30 bg-white/75 p-2.5 shadow-[0_8px_24px_rgba(40,55,75,0.06)] transition-colors hover:border-gold/55 hover:bg-white/90 sm:gap-3.5 sm:p-3"
    >
      <div className="relative h-[4.6rem] w-[4.6rem] shrink-0 overflow-hidden rounded-md border border-white/10 sm:h-[5.1rem] sm:w-[5.1rem]">
        <MediaImage
          src={post.imageSrc}
          alt={post.imageAlt}
          sizes="82px"
          className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        {post.category ? (
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold">{post.category}</p>
        ) : null}
        <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-[1.02rem] font-semibold leading-snug text-white transition-colors group-hover:text-gold sm:text-[1.08rem]">
          {post.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.68rem] text-white/55">
          {post.date ? (
            <span className="inline-flex items-center gap-1">
              <CalendarIcon />
              {post.date}
            </span>
          ) : null}
          {post.readTime ? (
            <span className="inline-flex items-center gap-1">
              <ClockIcon />
              {post.readTime}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}

export default function BlogSection() {
  const { blog, updatedAt } = useSiteContent();
  if (!blog?.visible) return null;

  return (
    <section className="relative border-t border-gold/15 px-4 pb-6 pt-8 sm:px-8 sm:pb-7 sm:pt-10 lg:px-10">
      <div className="relative mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/70 sm:w-14" aria-hidden="true" />
            <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[0.72rem]">
              {blog.eyebrow}
            </p>
            <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
            <span className="h-px w-10 bg-gold/70 sm:w-14" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5.6vw,3.35rem)] font-semibold leading-[1.12] tracking-tight text-white">
            {blog.headlineBefore}{" "}
            <em className="font-[family-name:var(--font-cormorant)] text-[0.72em] font-medium italic text-gold sm:text-[0.78em]">
              {blog.headlineScript}
            </em>{" "}
            {blog.headlineAfter}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-white/75 sm:text-[0.98rem]">
            {blog.body}
          </p>
          <div className="mx-auto mt-4 flex max-w-xs items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-gold/35" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
            <span className="h-px flex-1 bg-gold/35" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2 lg:gap-5">
            {(blog.featured ?? []).map((post) => (
              <FeaturedCard key={post.id} post={post} updatedAt={updatedAt} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {(blog.sidePosts ?? []).map((post) => (
              <SidePostRow key={post.id} post={post} updatedAt={updatedAt} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 sm:mt-7">
          <span className="hidden h-px w-16 bg-gold/40 sm:block" aria-hidden="true" />
          <Link
            href={blog.ctaHref || "#"}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-gold/70 bg-white/80 px-6 py-2.5 text-[0.78rem] font-semibold tracking-[0.1em] text-[color:var(--hl-ink,#151820)] transition-colors hover:border-gold hover:bg-gold/10 hover:text-[color:var(--hl-gold,#9a7b18)]"
          >
            {blog.ctaLabel} <span aria-hidden="true">→</span>
          </Link>
          <span className="hidden h-px w-16 bg-gold/40 sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
