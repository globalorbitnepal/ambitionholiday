"use client";

import DestinationCatalogPage from "@/components/DestinationCatalogPage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function TibetPage() {
  const { tibet: raw, updatedAt } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.tibet, ...raw };
  return (
    <DestinationCatalogPage
      page={page}
      coverAlt="Potala Palace and dark Himalayan peaks of Tibet"
      tablistLabel="Tibet packages"
      cacheKey={updatedAt}
    />
  );
}
