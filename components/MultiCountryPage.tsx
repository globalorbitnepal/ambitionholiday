"use client";

import DestinationCatalogPage from "@/components/DestinationCatalogPage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function MultiCountryPage() {
  const { multi: raw, updatedAt } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.multi, ...raw };
  return (
    <DestinationCatalogPage
      page={page}
      coverAlt="Himalayan kingdoms cover — Nepal, Bhutan and Tibet"
      tablistLabel="Multi-country packages"
      cacheKey={updatedAt}
    />
  );
}
