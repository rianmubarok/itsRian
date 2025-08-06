"use client";

import Link from "next/link";
import { AnimatedSection } from "../components/shared/ui";

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto my-48" role="main">
      <AnimatedSection direction="none" delay={0}>
        <div className="text-center">
          <h1 className="text-8xl font-bold text-primary-gray dark:text-primary-light mb-8">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-primary-dark dark:text-primary-light mb-6">
            Page Not Found 👀
          </h2>
          <p className="text-lg text-primary-gray dark:text-primary-gray mb-12 max-w-2xl mx-auto">
            Sorry, the page you’re looking for doesn’t seem to exist. It might
            have been moved, deleted, or maybe the URL was just a little off.
          </p>
        </div>
      </AnimatedSection>
    </main>
  );
}
