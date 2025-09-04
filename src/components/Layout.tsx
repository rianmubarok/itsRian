"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ProgressBar from "./ProgressBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isBlogDetail = /^\/blog\//.test(pathname);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressBar />
      <div
        className={[
          "min-h-screen flex flex-col",
          isBlogDetail
            ? "max-w-[425px] xs:max-w-[450px] sm:max-w-xl md:max-w-2xl mx-auto px-4 border-l border-r border-primary-gray/20"
            : "max-w-[425px] xs:max-w-[450px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto px-4 border-l border-r border-primary-gray/20",
        ].join(" ")}
      >
        <Navbar />
        <main className="flex-1" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
