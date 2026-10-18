import { isEbcHelicopterTourPackage, type TrekPackage } from "@/lib/trip-packages";

export type TrekTocItem = { id: string; label: string };

export const HELICOPTER_TOUR_TOC: TrekTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "book", label: "Availability" },
  { id: "tour-options", label: "Tour Options" },
  { id: "highlights", label: "Highlights" },
  { id: "why-us", label: "Why us" },
  { id: "trip-info", label: "Trip info" },
  { id: "itinerary", label: "Itinerary" },
  { id: "flight-route", label: "Flight Route" },
  { id: "landing-options", label: "Landings" },
  { id: "weather", label: "Weather" },
  { id: "includes", label: "Includes" },
  { id: "trip-gallery", label: "Gallery" },
  { id: "safety", label: "Safety" },
  { id: "booking-policy", label: "Booking" },
  { id: "faqs", label: "FAQs" },
];

export function buildHelicopterTourSectionToc(show: Record<string, boolean>): TrekTocItem[] {
  return HELICOPTER_TOUR_TOC.filter((item) => show[item.id]);
}

export function useHelicopterTourNav(pkg: Pick<TrekPackage, "id" | "slug" | "catalogId">) {
  return isEbcHelicopterTourPackage(pkg);
}
