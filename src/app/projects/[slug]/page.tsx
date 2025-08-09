import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "../../../types";
import { getProjectBySlug } from "../../../data/projects";
import { notFound } from "next/navigation";
import { formatDate } from "../../../utils";
import OtherProjects from "../../../components/project/OtherProjects";
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
      title: `Project Not Found - ${siteMetadata.title}`,
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} - ${siteMetadata.title}`,
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
      title: `${project.title} - ${siteMetadata.title}`,
      description:
        project.description || `Explore the ${project.title} project`,
      url: `${siteMetadata.siteUrl}/projects/${slug}`,
      siteName: siteMetadata.title,
      images: [
        {
          url:
            project.image ||
            `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
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
      title: `${project.title} - ${siteMetadata.title}`,
      description:
        project.description || `Explore the ${project.title} project`,
      images: [
        project.image || `${siteMetadata.siteUrl}${siteMetadata.twitterBanner}`,
      ],
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
