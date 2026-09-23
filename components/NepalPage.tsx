"use client";

import DestinationCatalogPage from "@/components/DestinationCatalogPage";
import { useSiteContent } from "@/components/SiteContentProvider";
import { DEFAULT_CONTENT } from "@/lib/content-types";

export default function NepalPage() {
  const { nepal: raw, updatedAt } = useSiteContent();
  const page = { ...DEFAULT_CONTENT.nepal, ...raw };
  return (
    <DestinationCatalogPage
      page={page}
      coverAlt="Dark Himalayan mountain cover of Nepal"
      tablistLabel="Nepal package categories"
      showCategories
      cacheKey={updatedAt}
    />
  );
}
