import Home from "../components/Home";
import { siteMetadata } from "../lib/metadata";

export const metadata = {
  title: `${siteMetadata.author} - Web Developer & UI/UX Designer`,
  description:
    "Passionate web developer and UI/UX enthusiast creating clean, functional, and engaging digital experiences. Specializing in React, TypeScript, and modern web technologies.",
  keywords: [
    "web developer",
    "UI/UX designer",
    "React",
    "TypeScript",
    "portfolio",
    "frontend developer",
  ],
  openGraph: {
    title: `${siteMetadata.author} - Web Developer & UI/UX Designer`,
    description:
      "Passionate web developer and UI/UX enthusiast creating clean, functional, and engaging digital experiences.",
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/og/home.png`,
        width: 1200,
        height: 630,
        alt: `${siteMetadata.author} - Portfolio`,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteMetadata.author} - Web Developer & UI/UX Designer`,
    description:
      "Passionate web developer and UI/UX enthusiast creating clean, functional, and engaging digital experiences.",
    images: [`${siteMetadata.siteUrl}/og/home.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};

export default function HomePage() {
  return <Home />;
}
