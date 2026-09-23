"use client";

import Link from "next/link";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import { useSiteContent } from "@/components/SiteContentProvider";
import { publishedJournalPosts } from "@/lib/blog";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

const WALLPAPER = SECTION_WALLPAPER;

export default function JournalIndexPage() {
  const { blog } = useSiteContent();
  const posts = publishedJournalPosts(blog);

  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="explore-hub journal-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={WALLPAPER}
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 40%"
            quality={74}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.4)_0%,rgba(8,18,28,0.16)_40%,rgba(6,14,22,0.42)_100%)]" />
        </div>
        <Header />
        <div className="explore-hub-shell contact-shell relative">
          <div className="explore-hub-glass contact-glass">
            <p className="explore-hub-eyebrow">{blog.eyebrow || "Journal"}</p>
            <h1 className="contact-brand font-[family-name:var(--font-cormorant)]">
              Stories from the Himalayas
            </h1>
            <p className="contact-lead">
              {blog.body ||
                "Guides, lake trails, high passes and short luxury itineraries — written by specialists who walk these routes."}
            </p>
          </div>

          <ul className="journal-grid">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={post.href} className="journal-card explore-hub-glass contact-glass">
                  <span className="journal-card-media">
                    <MediaImage
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      sizes="(max-width: 900px) 100vw, 46vw"
                      className="object-cover"
                    />
                    {post.category ? <span className="journal-card-cat">{post.category}</span> : null}
                  </span>
                  <span className="journal-card-copy">
                    <span className="journal-card-meta">
                      {post.date}
                      {post.readTime ? ` · ${post.readTime}` : ""}
                    </span>
                    <h2 className="font-[family-name:var(--font-cormorant)]">{post.title}</h2>
                    {post.excerpt ? <p>{post.excerpt}</p> : null}
                    <span className="journal-card-more">Read article</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <SiteFooter />
      </div>
    </main>
  );
}
