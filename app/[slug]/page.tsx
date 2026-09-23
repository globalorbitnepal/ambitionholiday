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
    return {
      title: pkg.metaTitle,
      description: pkg.metaDescription,
      keywords: pkg.metaKeywords,
      alternates: { canonical: path },
      openGraph: {
        title: pkg.metaTitle,
        description: pkg.metaDescription,
        url: path,
        type: "website",
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
  if (pkg) {
    return (
      <SiteContentProvider initial={content}>
        <TripPackagePage pkg={pkg} />
      </SiteContentProvider>
    );
  }

  const route = getRouteBySlug(slug);
  if (!route) notFound();

  if (slug === "contact") {
    return <ContactPage />;
  }

  const hub = getNavItemBySlug(slug);
  if (hub?.groups?.length) {
    return <NavHubPage item={hub} />;
  }

  return <PageShell title={route.title} description={route.description} />;
}
