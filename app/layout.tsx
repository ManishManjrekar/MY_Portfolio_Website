import type { Metadata, Viewport } from "next";
import { profile } from "@/content/profile";
import { ModeProvider } from "@/components/ModeProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.shortName} | ${profile.role}`,
  description: profile.summaryRecruiter,
  openGraph: {
    title: `${profile.shortName} | ${profile.role}`,
    description: profile.headline,
    url: siteUrl,
    type: "profile",
  },
  twitter: { card: "summary", title: profile.shortName, description: profile.headline },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F1215",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.shortName,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.linkedin, profile.github, profile.architectureUrl],
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
