"use client";

import DestinationCatalogPage from "@/components/DestinationCatalogPage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function HelicopterPage() {
  const { helicopter: raw, updatedAt } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.helicopter, ...raw };
  return (
    <DestinationCatalogPage
      page={page}
      coverAlt="Luxury helicopter over the Nepal Himalaya"
      tablistLabel="Helicopter tours"
      cacheKey={updatedAt}
    />
  );
}
