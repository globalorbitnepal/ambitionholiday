import type { Metadata } from "next";
import CompanyInfoPage from "@/components/CompanyInfoPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Ambition Holidays",
  description: "Booking terms for Ambition Holidays luxury tours and treks.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsRoute() {
  return (
    <CompanyInfoPage
      eyebrow="Company"
      title="Terms and Conditions"
      lead="These terms will govern bookings with Ambition Holidays. The full contract is confirmed in your itinerary and invoice."
      blocks={[
        {
          heading: "Bookings",
          body: "A journey is reserved when we confirm dates in writing and the agreed deposit is received. Permits, lodges and aircraft windows are subject to Nepal regulations and availability.",
        },
        {
          heading: "Changes and the mountains",
          body: "Weather, altitude and official closures can change a day on the trail. We re-plan in your interest. Cancellation and refund details will be stated on this page and in your booking letter.",
        },
        {
          heading: "Contact",
          body: "Ambition Holidays Pvt. Ltd., Thamel-26, Kathmandu. Email info@ambitionholidays.com. Sister company: Ambition Himalaya Treks and Expeditions.",
        },
      ]}
    />
  );
}
