"use client";

import { AnimatedSection } from "../components/shared/ui";
import { siteMetadata } from "../lib/metadata";

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto mt-40" role="main">
      <title>{`404 - ${siteMetadata.title}`}</title>
      <AnimatedSection direction="none" delay={0}>
        <div className="text-center">
          <h1 className="text-7xl lg:text-8xl font-bold text-primary-gray dark:text-primary-light mb-6 md:mb-8">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark dark:text-primary-light mb-4 md:mb-6 flex items-center justify-center gap-3 tracking-tight">
            <span>Page Not Found</span>
            <img
              src="/icons/eyes-color.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
            />
          </h2>
          <p className="text-base md:text-lg text-primary-gray dark:text-primary-gray mb-10 md:mb-12 max-w-2xl mx-auto">
            Sorry, the page you’re looking for doesn’t seem to exist. It might
            have been moved, deleted, or maybe the URL was just a little off.
          </p>
        </div>
      </AnimatedSection>
    </main>
  );
}
