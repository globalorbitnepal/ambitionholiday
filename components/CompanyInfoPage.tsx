"use client";

import Header from "@/components/Header";
import MediaImage from "@/components/MediaImage";
import SiteFooter from "@/components/SiteFooter";
import DuskAtmosphere from "@/components/DuskAtmosphere";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";

export type CompanyInfoBlock = {
  heading: string;
  body: string;
};

export default function CompanyInfoPage({
  eyebrow,
  title,
  lead,
  blocks,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  blocks: CompanyInfoBlock[];
}) {
  return (
    <main className="min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]">
      <section className="explore-hub visa-hub relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage
            src={SECTION_WALLPAPER}
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            objectPosition="center 38%"
            quality={74}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,22,0.44)_0%,rgba(8,18,28,0.18)_40%,rgba(6,14,22,0.48)_100%)]" />
        </div>
        <Header />
        <div className="explore-hub-shell contact-shell relative">
          <div className="explore-hub-glass contact-glass">
            <p className="explore-hub-eyebrow">{eyebrow}</p>
            <h1 className="contact-brand font-[family-name:var(--font-cormorant)]">{title}</h1>
            <p className="contact-lead">{lead}</p>
          </div>
          {blocks.map((block) => (
            <div key={block.heading} className="explore-hub-glass contact-glass about-copy-panel">
              <h2 className="about-h2 font-[family-name:var(--font-cormorant)]">{block.heading}</h2>
              {block.body.split(/\n{2,}/).map((para) => (
                <p key={para.slice(0, 48)}>{para.trim()}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <div className="home-light relative isolate [clip-path:inset(0)] text-[#f7f4ef]">
        <DuskAtmosphere />
        <SiteFooter />
      </div>
    </main>
  );
}
