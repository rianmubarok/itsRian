import "../styles/globals.css";
import Layout from "../components/Layout";
import { dmSans, playfairDisplay, sacramento } from "../lib/fonts";
import { siteMetadata } from "../lib/metadata";

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfairDisplay.variable} ${sacramento.variable}`}
    >
      <body
        className={`${dmSans.className} bg-primary-light dark:bg-primary-dark tracking-tight max-w-6xl mx-auto px-8`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
