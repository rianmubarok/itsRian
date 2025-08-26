"use client";

import IntroSection from "./home/IntroSection";
import LatestProjects from "./home/LatestProjects";
import LatestBlogs from "./home/LatestBlogs";
import SkillsSection from "./home/SkillsSection";
import SectionDivider from "./home/SectionDivider";
import { AnimatedSection } from "./shared/ui";

export default function Home() {
  return (
    <main
      className="max-w-6xl mx-auto my-32 md:my-40 lg:my-48"
      role="main"
    >
      <AnimatedSection direction="none" delay={0}>
        <IntroSection />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={200}>
        <SectionDivider />
        <br />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={400}>
        <LatestProjects />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={600}>
        <SectionDivider />
        <br />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={800}>
        <LatestBlogs />
      </AnimatedSection>

      <AnimatedSection direction="none" delay={1000}>
        <SectionDivider />
        <br />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={1200}>
        <SkillsSection />
      </AnimatedSection>
    </main>
  );
}
