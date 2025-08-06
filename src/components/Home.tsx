"use client";

import IntroSection from "./home/IntroSection";
import FeaturedProjects from "./home/FeaturedProjects";
import FeaturedBlogs from "./home/FeaturedBlogs";
import SkillsSection from "./home/SkillsSection";
import { AnimatedSection, FloatingContactButton } from "./shared/ui";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto my-48" role="main">
      <AnimatedSection direction="none" delay={0}>
        <IntroSection />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={200}>
        <hr className="border-t border-primary-gray/20 my-12" />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={400}>
        <FeaturedProjects />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={600}>
        <hr className="border-t border-primary-gray/20 my-12" />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={800}>
        <FeaturedBlogs />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={1000}>
        <hr className="border-t border-primary-gray/20 my-12" />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={1200}>
        <SkillsSection />
      </AnimatedSection>

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </main>
  );
}
