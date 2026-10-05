import { siteMetadata } from "../../../lib/metadata";

export const metadata = {
  title: `Experiment Projects`,
  description:
    "Explore my experimental projects, prototypes, and research built to learn, explore, and understand cutting-edge technologies.",
  keywords: [
    "experiments",
    "research",
    "projects",
    "portfolio",
    "Machine Learning",
    "Data Science",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: `Experiment Projects`,
    description:
      "Explore my experimental projects, prototypes, and research built to learn, explore, and understand cutting-edge technologies.",
    url: `${siteMetadata.siteUrl}/projects/experiment`,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/og/projects.png`,
        width: 1200,
        height: 630,
        alt: "Experiment Projects Portfolio",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Experiment Projects`,
    description:
      "Explore my experimental projects, prototypes, and research built to learn, explore, and understand cutting-edge technologies.",
    images: [`${siteMetadata.siteUrl}/og/projects.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/projects/experiment`,
  },
};

import ProjectsPageClient from "../ProjectsPageClient";

export default function ExperimentPage() {
  return <ProjectsPageClient initialTab="experiment" />;
}
