import type { Metadata } from "next";
import CompanyInfoPage from "@/components/CompanyInfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Ambition Holidays",
  description: "How Ambition Holidays collects and uses personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyRoute() {
  return (
    <CompanyInfoPage
      eyebrow="Company"
      title="Privacy Policy"
      lead="Ambition Holidays Pvt. Ltd. respects the information you share when you enquire, book or subscribe."
      blocks={[
        {
          heading: "What we collect",
          body: "Name, email, phone, nationality, travel dates and the details you send in a form or WhatsApp message. We use this to reply, plan itineraries and meet Nepal permit requirements.",
        },
        {
          heading: "How we use it",
          body: "We do not sell guest lists. Information is shared only with operators, lodges, airlines or authorities needed to deliver your journey — including our sister company Ambition Himalaya Treks and Expeditions where operations require it.",
        },
        {
          heading: "Contact",
          body: "Questions about your data: info@ambitionholidays.com or Thamel-26, Kathmandu, Nepal. Full legal wording will be completed here from Orbit.",
        },
      ]}
    />
  );
}
