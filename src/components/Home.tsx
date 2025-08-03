"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import IntroSection from "./home/IntroSection";
import FeaturedProjects from "./home/FeaturedProjects";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto my-48" role="main">
      <IntroSection />
      <hr className="border-t border-primary-gray my-12" />
      <FeaturedProjects />
      <hr className="border-t border-primary-gray my-12" />
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[32px] font-regular text-primary-dark dark:text-primary-light">
            Latest Article
          </h2>
          <Link
            href="/blog"
            className="text-lg text-primary-dark font-light inline-flex items-center gap-2"
          >
            View all articles
            <ArrowRight className="w-6 h-6 stroke-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
