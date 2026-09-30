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
import { findTripBySlug, tripPath } from "@/lib/trip-packages";
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
    const title = pkg.metaTitle?.trim() || `${pkg.title} | ${SITE_NAME}`;
    const description = pkg.metaDescription?.trim() || pkg.subtitle;
    const ogTitle = pkg.ogTitle?.trim() || title;
    const ogDescription = pkg.ogDescription?.trim() || description;
    const image = pkg.ogImageSrc?.trim() || pkg.heroSrc;
    const images = image ? [{ url: absoluteUrl(image), alt: pkg.heroAlt || pkg.title }] : undefined;
    const keywords = [...splitKeywords(pkg.metaKeywords || ""), ...(pkg.focusKeyword ? [pkg.focusKeyword] : [])];
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

  let page: ReactNode;
  if (pkg) {
    const url = absoluteUrl(tripPath(pkg));
    const offerPrice = pkg.priceUsd > 0 ? pkg.priceUsd : undefined;
    page = (
      <>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: pkg.title,
            description: pkg.metaDescription || pkg.subtitle,
            url,
            image: [pkg.heroSrc, ...pkg.gallery].filter(Boolean).slice(0, 6).map((src) => absoluteUrl(src)),
            touristType: pkg.activityLabel || "Luxury travellers",
            itinerary: pkg.itinerary?.length
              ? {
                  "@type": "ItemList",
                  numberOfItems: pkg.itinerary.length,
                  itemListElement: pkg.itinerary.map((day, index) => ({
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
        {pkg.faqs?.length ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: pkg.faqs
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
