import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ContactPage from "@/components/ContactPage";
import NavHubPage from "@/components/NavHubPage";
import PageShell from "@/components/PageShell";
import SiteContentProvider from "@/components/SiteContentProvider";
import TripPackagePage from "@/components/TripPackagePage";
import { readContent } from "@/lib/content";
import { getAllRoutes, getNavItemBySlug, getRouteBySlug } from "@/lib/nav";
import { findTripBySlug, isEverestViewPackage, tripPath } from "@/lib/trip-packages";
import { resolveTripPackageForPage } from "@/lib/everest-view-public-display";
import { absoluteUrl, SITE_NAME, SITE_URL, splitKeywords } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return getAllRoutes()
    .filter((route) =>
      !["journal", "contact", "blog", "about-us", "company", "experiences", "visa-and-entry", "best-time-to-visit", "packing-guide", "altitude-tips", "permits-and-fees", "nepal", "bhutan", "tibet", "himalayan-multi-countries-tour", "himalayan-multi-countries", "helicopter-tours", "photography-treks", "legal-documents", "how-to-book", "become-a-partner", "privacy-policy", "terms-and-conditions", "privacy", "terms", "everest-base-camp-luxury-trek", "admin", "packages", "trip", "saved"].includes(
        route.slug,
      ),
    )
    .map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await readContent();
  const pkg = findTripBySlug(content.tripPackages, slug);
  if (pkg) {
    const path = tripPath(pkg);
    if (`/${slug}` !== path) redirect(path);
    const publicPkg = resolveTripPackageForPage(pkg);
    const title = publicPkg.metaTitle?.trim() || `${publicPkg.title} | ${SITE_NAME}`;
    const description = publicPkg.metaDescription?.trim() || publicPkg.subtitle;
    const ogTitle = publicPkg.ogTitle?.trim() || title;
    const ogDescription = publicPkg.ogDescription?.trim() || description;
    const image = publicPkg.ogImageSrc?.trim() || publicPkg.heroSrc;
    const images = image ? [{ url: absoluteUrl(image), alt: publicPkg.heroAlt || publicPkg.title }] : undefined;
    const keywords = [...splitKeywords(publicPkg.metaKeywords || ""), ...(publicPkg.focusKeyword ? [publicPkg.focusKeyword] : [])];
    return {
      title: { absolute: title },
      description,
      keywords: keywords.length ? Array.from(new Set(keywords)) : undefined,
      alternates: { canonical: path },
      robots: pkg.noindex ? { index: false, follow: true } : undefined,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: path,
        siteName: SITE_NAME,
        type: "website",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: images?.map((item) => item.url),
      },
    };
  }

  const route = getRouteBySlug(slug);
  if (!route) {
    return { title: "Page not found | Ambition Holiday" };
  }

  if (slug === "about-us" || slug === "company") {
    return {
      title: "Company | Ambition Holidays",
      description:
        "Ambition Holidays is a 10+ year luxury tour and trek company — sister company of Ambition Himalaya Treks and Expeditions.",
      alternates: { canonical: "/company" },
    };
  }

  if (slug === "contact") {
    return {
      title: "Contact | Ambition Holidays",
      description:
        "Contact Ambition Holidays in Thamel, Kathmandu — sister company of Ambition Himalaya Treks and Expeditions. Call +977 1 4518413 or +977 9851148898.",
      alternates: { canonical: "/contact" },
    };
  }

  return {
    title: `${route.title} | Ambition Holiday`,
    description: route.description,
    alternates: {
      canonical: `/${route.slug}`,
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "blog") redirect("/journal");

  const content = await readContent();
  const pkg = findTripBySlug(content.tripPackages, slug);
  if (pkg && `/${slug}` !== tripPath(pkg)) redirect(tripPath(pkg));

  let page: ReactNode;
  if (pkg) {
    const publicPkg = resolveTripPackageForPage(pkg);
    const path = tripPath(publicPkg);
    const url = absoluteUrl(path);
    const offerPrice = publicPkg.priceUsd > 0 ? publicPkg.priceUsd : undefined;
    page = (
      <>
        {isEverestViewPackage(publicPkg) ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Nepal", item: absoluteUrl("/nepal") },
                { "@type": "ListItem", position: 3, name: publicPkg.title, item: url },
              ],
            }}
          />
        ) : null}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: publicPkg.title,
            description: publicPkg.metaDescription || publicPkg.subtitle,
            url,
            image: [publicPkg.heroSrc, ...publicPkg.gallery].filter(Boolean).slice(0, 6).map((src) => absoluteUrl(src)),
            touristType: publicPkg.activityLabel || "Luxury travellers",
            itinerary: publicPkg.itinerary?.length
              ? {
                  "@type": "ItemList",
                  numberOfItems: publicPkg.itinerary.length,
                  itemListElement: publicPkg.itinerary.map((day, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: `Day ${day.day}: ${day.title}`,
                  })),
                }
              : undefined,
            offers: offerPrice
              ? {
                  "@type": "Offer",
                  price: offerPrice,
                  priceCurrency: "USD",
                  url,
                  availability: "https://schema.org/InStock",
                }
              : undefined,
            provider: { "@type": "TravelAgency", name: SITE_NAME, url: SITE_URL },
          }}
        />
        {publicPkg.faqs?.length ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: publicPkg.faqs
                .filter((faq) => faq.q && faq.a)
                .map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
            }}
          />
        ) : null}
        <TripPackagePage pkg={pkg} />
      </>
    );
  } else {
    const route = getRouteBySlug(slug);
    if (!route) notFound();

    if (slug === "contact") {
      page = <ContactPage />;
    } else {
      const hub = getNavItemBySlug(slug);
      if (hub?.groups?.length) {
        page = <NavHubPage item={hub} />;
      } else {
        page = <PageShell title={route.title} description={route.description} />;
      }
    }
  }

  return <SiteContentProvider initial={content}>{page}</SiteContentProvider>;
}
