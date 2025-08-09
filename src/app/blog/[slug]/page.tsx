import { notFound } from "next/navigation";
import { siteMetadata } from "../../../lib/metadata";
import { getBlogBySlug } from "../../../lib/notion-service";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: `Blog Post Not Found - ${siteMetadata.title}`,
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} - ${siteMetadata.title}`,
    description:
      blog.description ||
      `Read ${blog.title} - insights and thoughts on web development, design, and technology.`,
    keywords: [
      "blog",
      "article",
      blog.title,
      ...(blog.tags || []),
      "web development",
      "technology",
      "programming",
    ],
    openGraph: {
      title: `${blog.title} - ${siteMetadata.title}`,
      description: blog.description || `Read ${blog.title}`,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      siteName: siteMetadata.title,
      images: [
        {
          url:
            blog.thumbnail ||
            `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: siteMetadata.locale,
      type: "article",
      publishedTime: blog.createdAt,
      authors: [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} - ${siteMetadata.title}`,
      description: blog.description || `Read ${blog.title}`,
      images: [
        blog.thumbnail ||
          `${siteMetadata.siteUrl}${siteMetadata.twitterBanner}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${slug}`,
    },
  };
}

import BlogDetailPageClient from "@/app/blog/[slug]/BlogDetailPageClient";

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return <BlogDetailPageClient params={params} />;
}
