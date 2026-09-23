import type { Metadata } from "next";
import CompanyInfoPage from "@/components/CompanyInfoPage";

export const metadata: Metadata = {
  title: "How to Book | Ambition Holidays",
  description: "How to book a luxury Nepal, Bhutan or Tibet journey with Ambition Holidays.",
  alternates: { canonical: "/how-to-book" },
};

export default function HowToBookRoute() {
  return (
    <CompanyInfoPage
      eyebrow="Company"
      title="How to Book"
      lead="A private Ambition Holidays journey starts with a conversation — dates, pace, lodges and how you want the mountains to feel."
      blocks={[
        {
          heading: "1. Tell us the journey",
          body: "Share the region, season and who is travelling. Use Contact, WhatsApp +977 9851148898, or the questions form on About Us. We reply with a clear outline — not a generic brochure.",
        },
        {
          heading: "2. Shape it privately",
          body: "We lock lodges, permits, guiding and any helicopter windows around your dates. You review the itinerary, then confirm with a deposit as agreed in writing.",
        },
        {
          heading: "3. Travel with specialists",
          body: "From Kathmandu briefing to the trail, the same house that planned the journey operates it — sister company of Ambition Himalaya Treks and Expeditions.",
        },
      ]}
    />
  );
}
