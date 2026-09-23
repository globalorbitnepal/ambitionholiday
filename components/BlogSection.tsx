"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import MediaImage from "@/components/MediaImage";
import SectionWallpaper from "@/components/SectionWallpaper";
import type { BlogPost } from "@/lib/content-types";
import { publishedJournalPosts } from "@/lib/blog";
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
    <article className="explore-hub-glass group flex flex-col overflow-hidden !p-0">
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
        <h3 className="text-[1.28rem] font-semibold leading-snug text-white sm:text-[1.45rem]">
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
      className="explore-hub-glass group flex gap-3 !p-2.5 transition-colors hover:border-white/50 sm:gap-3.5 sm:p-3"
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
        <h3 className="mt-1 text-[1.02rem] font-semibold leading-snug text-white transition-colors group-hover:text-[#e4c35a] sm:text-[1.08rem]">
          {post.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.68rem] text-white/70">
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
  const published = publishedJournalPosts(blog);
  const featured = published.slice(0, 2);
  const sidePosts = published.slice(2, 5);

  return (
    <section className="blog-section explore-hub relative isolate overflow-hidden">
      <SectionWallpaper />
      <div className="explore-hub-shell relative">
        <div className="explore-hub-glass">
        <div className="mx-auto max-w-3xl text-center">
          <p className="explore-hub-eyebrow">{blog.eyebrow}</p>
          <h2 className="explore-hub-title font-[family-name:var(--font-cormorant)] font-semibold text-white">
            {blog.headlineBefore}{" "}
            <span className="text-[#e4c35a]">{blog.headlineScript}</span>{" "}
            {blog.headlineAfter}
          </h2>
          <p className="explore-hub-body mx-auto">
            {blog.body}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2 lg:gap-5">
            {featured.map((post) => (
              <FeaturedCard key={post.id} post={post} updatedAt={updatedAt} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {sidePosts.map((post) => (
              <SidePostRow key={post.id} post={post} updatedAt={updatedAt} />
            ))}
          </div>
        </div>

        <div className="explore-hub-foot mt-6">
          <Link
            href={blog.ctaHref || "/journal"}
            className="explore-hub-cta"
          >
            {blog.ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
