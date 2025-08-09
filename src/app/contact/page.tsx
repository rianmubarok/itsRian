import { siteMetadata } from "../../lib/metadata";

export const metadata = {
  title: `Contact - ${siteMetadata.title}`,
  description:
    "Get in touch with me for creative discussions, project collaborations, or any questions. I'm always open to new opportunities and connections.",
  keywords: [
    "contact",
    "hire",
    "collaboration",
    "freelance",
    "web developer",
    "UI/UX designer",
    "project inquiry",
  ],
  openGraph: {
    title: `Contact - ${siteMetadata.title}`,
    description:
      "Get in touch with me for creative discussions, project collaborations, or any questions.",
    url: `${siteMetadata.siteUrl}/contact`,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: "Contact Me - Let's Connect",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact - ${siteMetadata.title}`,
    description:
      "Get in touch with me for creative discussions and project collaborations.",
    images: [`${siteMetadata.siteUrl}${siteMetadata.twitterBanner}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/contact`,
  },
};

import ContactPageClient from "./ContactPageClient";

export default function ContactPage() {
  return <ContactPageClient />;
}
