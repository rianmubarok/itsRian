import { getProjectBySlug } from "../../../lib/projects-service";
import { siteMetadata } from "../../../lib/metadata";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: `Project Not Found`,
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title}`,
    description:
      project.description ||
      `Explore the ${project.title} project - a showcase of modern web development and design.`,
    keywords: [
      "project",
      "portfolio",
      project.title,
      ...(project.tags || []),
      "web development",
      "React",
      "TypeScript",
    ],
    openGraph: {
      title: `${project.title}`,
      description:
        project.description || `Explore the ${project.title} project`,
      url: `${siteMetadata.siteUrl}/projects/${slug}`,
      siteName: siteMetadata.title,
      images: [
        {
          url: project.thumbnail || `${siteMetadata.siteUrl}/og/project.png`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: siteMetadata.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}`,
      description:
        project.description || `Explore the ${project.title} project`,
      images: [project.thumbnail || `${siteMetadata.siteUrl}/og/project.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/projects/${slug}`,
    },
  };
}

import ProjectDetailPageClient from "./ProjectDetailPageClient";

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailPageClient params={params} />;
}
