import { siteMetadata } from "@/lib/metadata";

export const metadata = {
  title: `Guestbook`,
  description:
    "Leave a message, suggestion, or question in my guestbook. Share your thoughts and connect with other visitors to my portfolio.",
  keywords: [
    "guestbook",
    "messages",
    "feedback",
    "community",
    "contact",
    "suggestions",
  ],
  openGraph: {
    title: `Guestbook`,
    description:
      "Leave a message, suggestion, or question in my guestbook. Share your thoughts and connect with other visitors.",
    url: `${siteMetadata.siteUrl}/guestbook`,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: "Guestbook - Leave a Message",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Guestbook`,
    description: "Leave a message, suggestion, or question in my guestbook.",
    images: [`${siteMetadata.siteUrl}${siteMetadata.twitterBanner}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/guestbook`,
  },
};

import GuestbookPageClient from "./GuestbookPageClient";

export default function GuestbookPage() {
  return <GuestbookPageClient />;
}
