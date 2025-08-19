import "../styles/globals.css";
import Layout from "../components/Layout";
import { dmSans, playfairDisplay, sacramento } from "../lib/fonts";
import { siteMetadata } from "../lib/metadata";

export const metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s - ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: [
    "web developer",
    "UI/UX designer",
    "React",
    "TypeScript",
    "portfolio",
    "frontend developer",
  ],
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  metadataBase: new URL(siteMetadata.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.twitterBanner],
    creator: "@itsrian",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-config": "/browserconfig.xml",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
    image: `${siteMetadata.siteUrl}${siteMetadata.image}`,
    description: siteMetadata.description,
    jobTitle: "Web Developer & UI/UX Designer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      siteMetadata.github,
      siteMetadata.linkedin,
      siteMetadata.twitter,
      siteMetadata.instagram,
    ].filter(Boolean),
    knowsAbout: [
      "Web Development",
      "React",
      "TypeScript",
      "UI/UX Design",
      "Frontend Development",
      "JavaScript",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfairDisplay.variable} ${sacramento.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${dmSans.className} bg-primary-light dark:bg-primary-dark tracking-tight max-w-6xl mx-auto px-6 md:px-8`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
