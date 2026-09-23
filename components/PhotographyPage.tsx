"use client";

import DestinationCatalogPage from "@/components/DestinationCatalogPage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function PhotographyPage() {
  const { photography: raw, updatedAt } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.photography, ...raw };
  return (
    <DestinationCatalogPage
      page={page}
      coverAlt="Gokyo lakes and Himalayan peaks for photography treks"
      tablistLabel="Photography treks"
      cacheKey={updatedAt}
    />
  );
}
