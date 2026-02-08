import { siteMetadata } from "../../../lib/metadata";

export const metadata = {
  title: `Blog`,
  description:
    "Read my latest thoughts on Visual Design, development, technology, and programming. Insights, tutorials, and experiences from a passionate developer.",
  keywords: [
    "blog",
    "articles",
    "Visual Design",
    "programming",
    "technology",
    "design",
    "tutorials",
    "insights",
  ],
  openGraph: {
    title: `Blog`,
    description:
      "Read my latest thoughts on Visual Design, development, technology, and programming.",
    url: `${siteMetadata.siteUrl}/blog`,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/og/blog.png`,
        width: 1200,
        height: 630,
        alt: "Blog Articles",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog`,
    description:
      "Read my latest thoughts on Visual Design, development, technology, and programming.",
    images: [`${siteMetadata.siteUrl}/og/blog.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/blog`,
  },
};

import BlogPageClient from "../BlogPageClient";

export default function BlogPage() {
  return <BlogPageClient />;
}
