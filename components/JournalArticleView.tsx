"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import type { BlogPost } from "@/lib/content-types";
import { sectionAnchor } from "@/lib/blog";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

const WALLPAPER = SECTION_WALLPAPER;

function paragraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default function JournalArticleView({ post }: { post: BlogPost }) {
  const sections = useMemo(() => post.sections ?? [], [post.sections]);
  const [active, setActive] = useState(sections[0] ? sectionAnchor(sections[0], 0) : "");

  useEffect(() => {
    const nodes = sections
      .map((section, index) => document.getElementById(sectionAnchor(section, index)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [sections]);

  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="explore-hub journal-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={WALLPAPER}
            alt=""
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 40%"
            quality={70}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.46)_0%,rgba(8,18,28,0.2)_42%,rgba(6,14,22,0.5)_100%)]" />
        </div>
        <Header />
        <div className="explore-hub-shell contact-shell relative">
          <article className="journal-article">
            <div className="explore-hub-glass contact-glass journal-article-main">
              <p className="explore-hub-eyebrow">{post.category || "Journal"}</p>
              <h1 className="journal-article-title font-[family-name:var(--font-cormorant)]">{post.title}</h1>
              <p className="journal-article-byline">
                {post.authorName ? `${post.authorName} · ` : ""}
                {post.date}
                {post.readTime ? ` · ${post.readTime}` : ""}
              </p>
              <div className="journal-article-cover">
                <MediaImage src={post.imageSrc} alt={post.imageAlt} sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" />
              </div>
              {post.excerpt ? <p className="journal-article-excerpt">{post.excerpt}</p> : null}

              {sections.map((section, index) => {
                const id = sectionAnchor(section, index);
                return (
                  <section key={id} id={id} className="journal-section">
                    <h2 className="font-[family-name:var(--font-cormorant)]">{section.heading}</h2>
                    {paragraphs(section.body).map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </section>
                );
              })}

              <div className="journal-article-foot">
                <Link href="/journal" className="contact-map-link">
                  Back to journal
                </Link>
                <Link href="/contact" className="contact-submit">
                  Plan this journey
                </Link>
              </div>
            </div>

            <aside className="explore-hub-glass contact-glass journal-toc">
              <p className="journal-toc-title">Table of Contents</p>
              <ol>
                {sections.map((section, index) => {
                  const id = sectionAnchor(section, index);
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={active === id ? "is-on" : ""}
                        onClick={() => setActive(id)}
                      >
                        {index + 1}. {section.heading}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </aside>
          </article>
        </div>
      </section>
      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <SiteFooter />
      </div>
    </main>
  );
}
