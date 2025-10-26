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
      title: `Blog Post Not Found`,
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: {
      absolute: blog.title,
    },
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
      siteMetadata.author,
    ],
    authors: [{ name: siteMetadata.author }],
    openGraph: {
      title: blog.title,
      description: blog.description || `Read ${blog.title}`,
      url: `${siteMetadata.siteUrl}/blog/${slug}`,
      siteName: siteMetadata.title,
      images: [
        {
          url:
            blog.ogImage ||
            blog.thumbnail ||
            `${siteMetadata.siteUrl}/og/blog.png`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: siteMetadata.locale,
      type: "article",
      publishedTime: blog.createdAt,
      authors: [siteMetadata.author],
      section: "Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description || `Read ${blog.title}`,
      images: [
        blog.ogImage || blog.thumbnail || `${siteMetadata.siteUrl}/og/blog.png`,
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
