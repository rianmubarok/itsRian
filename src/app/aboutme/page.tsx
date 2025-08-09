import { siteMetadata } from "../../lib/metadata";

export const metadata = {
  title: `About Me - ${siteMetadata.title}`,
  description:
    "Learn about my journey as a web developer and UI/UX designer. Discover my experience, skills, and passion for creating digital solutions.",
  keywords: [
    "about",
    "experience",
    "skills",
    "web developer",
    "UI/UX designer",
    "biography",
    "career",
    "expertise",
  ],
  openGraph: {
    title: `About Me - ${siteMetadata.title}`,
    description:
      "Learn about my journey as a web developer and UI/UX designer. Discover my experience, skills, and passion for creating digital solutions.",
    url: `${siteMetadata.siteUrl}/aboutme`,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: "About Me - My Journey",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Me - ${siteMetadata.title}`,
    description:
      "Learn about my journey as a web developer and UI/UX designer.",
    images: [`${siteMetadata.siteUrl}${siteMetadata.twitterBanner}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/aboutme`,
  },
};

import AboutMePageClient from "./AboutMePageClient";

export default function AboutMePage() {
  return <AboutMePageClient />;
}
