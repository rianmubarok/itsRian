"use client";

import IntroSection from "./home/IntroSection";
import FeaturedProjects from "./home/FeaturedProjects";
import FeaturedBlogs from "./home/FeaturedBlogs";
import SkillsSection from "./home/SkillsSection";
import SectionDivider from "./home/SectionDivider";
import { AnimatedSection, FloatingContactButton } from "./shared/ui";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto my-24 sm:my-32 md:my-40 lg:my-48" role="main">
      <AnimatedSection direction="none" delay={0}>
        <IntroSection />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={200}>
        <SectionDivider />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={400}>
        <FeaturedProjects />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={600}>
        <SectionDivider />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={800}>
        <FeaturedBlogs />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={1000}>
        <SectionDivider />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={1200}>
        <SkillsSection />
      </AnimatedSection>

      {/* Floating Contact Button */}
      <FloatingContactButton />
    </main>
  );
}
