import type { Metadata, Viewport } from "next";
import NavigationUX from "@/components/NavigationUX";
import { DEFAULT_SITE_LOGO } from "@/lib/media-src";
import { SECTION_WALLPAPER } from "@/lib/section-wallpaper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ambition Holiday | Journeys Beyond Limits",
  description:
    "Premium Nepal trekking and adventure travel with Ambition Holiday. Discover handpicked routes, expert guides, and journeys beyond limits.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ambition Holidays",
  },
  icons: {
    icon: "/images/ambition-holiday-logo.webp",
    apple: "/images/ambition-holiday-logo.webp",
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1a1f27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/hero-video-poster.webp" fetchPriority="high" />
        <link rel="preload" as="image" href={DEFAULT_SITE_LOGO} />
        <link rel="preload" as="image" href={SECTION_WALLPAPER} />
      </head>
      <body className="antialiased">
        <NavigationUX />
        {children}
      </body>
    </html>
  );
}
