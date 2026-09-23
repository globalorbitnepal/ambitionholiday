"use client";

import DestinationCatalogPage from "@/components/DestinationCatalogPage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function BhutanPage() {
  const { bhutan: raw, updatedAt } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.bhutan, ...raw };
  return (
    <DestinationCatalogPage
      page={page}
      coverAlt="Tiger's Nest monastery and dark Himalayan cliffs of Bhutan"
      tablistLabel="Bhutan packages"
      cacheKey={updatedAt}
    />
  );
}
