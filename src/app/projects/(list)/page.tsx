import { siteMetadata } from "../../../lib/metadata";

export const metadata = {
  title: `Projects`,
  description:
    "Explore my portfolio of Visual Design projects, featuring modern React applications, UI/UX designs, and full-stack solutions built with cutting-edge technologies.",
  keywords: [
    "projects",
    "portfolio",
    "Visual Design",
    "React",
    "TypeScript",
    "UI/UX",
    "frontend",
    "fullstack",
  ],
  openGraph: {
    title: `Projects`,
    description:
      "Explore my portfolio of Visual Design projects, featuring modern React applications, UI/UX designs, and full-stack solutions.",
    url: `${siteMetadata.siteUrl}/projects`,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/og/projects.png`,
        width: 1200,
        height: 630,
        alt: "Projects Portfolio",
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects`,
    description:
      "Explore my portfolio of Visual Design projects, featuring modern React applications and UI/UX designs.",
    images: [`${siteMetadata.siteUrl}/og/projects.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/projects`,
  },
};

import ProjectsPageClient from "../ProjectsPageClient";

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
