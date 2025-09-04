"use client";

import { useIntersectionObserver } from "../../hooks";
import { AnimatedSection } from "../../components/shared/ui";
import SectionAccordion from "../../components/aboutme/SectionAccordion";
import ExperienceList from "../../components/aboutme/ExperienceList";
import EducationList from "../../components/aboutme/EducationList";
import LicenseList from "../../components/aboutme/LicenseList";

export default function AboutMePageClient() {
  const { ref: headerRef, isIntersecting: headerIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: profileRef, isIntersecting: profileIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40"
      role="main"
    >
      <article className="border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-6 bg-gray-100 dark:bg-primary-light/5">
        <AnimatedSection direction="up" duration={700}>
          <div className="tracking-normal font-regular text-base space-y-3 sm:space-y-4">
            <p>Hello! Thank you for visiting my personal website.</p>
            <p>
              I&apos;m Rian, a passionate web developer and UI/UX enthusiast who
              thrives on turning ideas into clean, functional, and engaging
              digital experiences. Over the years, I&apos;ve dedicated myself to
              understanding both the visual side of design and the logical side
              of development — bridging creativity and code.
            </p>
            <p>
              I specialize in building responsive websites and interactive user
              interfaces using technologies like JavaScript, TypeScript, React,
              and Tailwind CSS. On the backend, I&apos;ve explored Node.js and
              Firebase for creating scalable, real-time applications. I also
              enjoy learning about full-stack workflows and staying updated with
              modern development tools and best practices.
            </p>
            <p>
              What drives me most is creating intuitive user experiences that
              not only look good but also solve real problems. I pay close
              attention to accessibility, performance, and maintainable code —
              because great interfaces should work well for everyone.
            </p>
            <p>
              In collaborative environments, I&apos;m a good listener, proactive
              problem-solver, and open to feedback. Whether working in a team or
              independently, I always aim to deliver thoughtful, reliable
              solutions that align with project goals.
            </p>
            <p>
              I&apos;m excited about future opportunities to collaborate and
              build purposeful, user-centered digital products.
            </p>
            <p>Best regards,</p>
            <h2 className="tracking-normal mt-10 sm:mt-15 font-sacramento-signature font-regular text-3xl sm:text-4xl md:text-5xl text-primary-dark dark:text-primary-light">
              Rian
            </h2>
          </div>
        </AnimatedSection>
      </article>

      <hr className="border-t border-primary-gray/20 my-8 sm:my-12" />

      {/* Experience Section dengan Accordion */}
      <AnimatedSection direction="up" duration={700} delay={0} className="mb-4">
        <SectionAccordion title="Experience">
          <ExperienceList />
        </SectionAccordion>
      </AnimatedSection>

      {/* Education Section dengan Accordion */}
      <AnimatedSection
        direction="up"
        duration={700}
        delay={200}
        className="mb-4"
      >
        <SectionAccordion title="Education">
          <EducationList />
        </SectionAccordion>
      </AnimatedSection>

      {/* License & Certification Section dengan Accordion */}
      <AnimatedSection
        direction="up"
        duration={700}
        delay={400}
        className="mb-4"
      >
        <SectionAccordion title="Licenses & Certifications">
          <LicenseList />
        </SectionAccordion>
      </AnimatedSection>
    </main>
  );
}
