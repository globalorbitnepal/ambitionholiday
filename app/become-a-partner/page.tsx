import type { Metadata } from "next";
import CompanyInfoPage from "@/components/CompanyInfoPage";

export const metadata: Metadata = {
  title: "Become a Partner | Ambition Holidays",
  description: "Partner with Ambition Holidays — agents, DMC and luxury travel houses.",
  alternates: { canonical: "/become-a-partner" },
};

export default function BecomeAPartnerRoute() {
  return (
    <CompanyInfoPage
      eyebrow="Company"
      title="Become a Partner"
      lead="We work with selected agencies, DMCs and luxury travel houses who want a reliable Kathmandu operator for Nepal, Bhutan and Tibet."
      blocks={[
        {
          heading: "Who we partner with",
          body: "Specialist agencies, private-client desks and brands that need lodge-grade Himalayan operations — not a high-volume trek factory.",
        },
        {
          heading: "What we offer partners",
          body: "Clear contracting, honest availability, and the same specialist guiding we give direct guests. Ambition Holidays is the luxury sister of Ambition Himalaya Treks and Expeditions.",
        },
        {
          heading: "Start a conversation",
          body: "Email info@ambitionholidays.com with your company name, markets and the journeys you want to place. We reply from Thamel, Kathmandu.",
        },
      ]}
    />
  );
}
