"use client";

import IntroSection from "./home/IntroSection";
import FeaturedProjects from "./home/FeaturedProjects";
import FeaturedBlogs from "./home/FeaturedBlogs";
import SkillsSection from "./home/SkillsSection";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto my-48" role="main">
      <IntroSection />
      <hr className="border-t border-primary-gray my-12" />
      <FeaturedProjects />
      <hr className="border-t border-primary-gray my-12" />
      <FeaturedBlogs />
      <hr className="border-t border-primary-gray my-12" />
      <SkillsSection />
    </main>
  );
}
