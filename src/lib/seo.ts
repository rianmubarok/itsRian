import { Metadata } from "next";
import { siteMetadata } from "./metadata";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
}: SEOProps): Metadata {
  const seoTitle = title
    ? `${title} - ${siteMetadata.title}`
    : siteMetadata.title;
  const seoDescription = description || siteMetadata.description;
  const seoImage =
    image || `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`;
  const seoUrl = url || siteMetadata.siteUrl;

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: siteMetadata.title,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: title || siteMetadata.title,
        },
      ],
      locale: siteMetadata.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: seoUrl,
    },
  };

  // Add article-specific metadata
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      authors: authors || [siteMetadata.author],
    };
  }

  return metadata;
}

// Helper function for dynamic pages
export async function generateDynamicSEO<T>(
  params: { slug: string },
  fetchData: (slug: string) => Promise<T | null>,
  getMetadata: (data: T, slug: string) => SEOProps,
  notFoundMetadata: SEOProps
): Promise<Metadata> {
  const { slug } = params;
  const data = await fetchData(slug);

  if (!data) {
    return generateSEO(notFoundMetadata);
  }

  return generateSEO(getMetadata(data, slug));
}
