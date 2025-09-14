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
              I&apos;m Rian, a dedicated web developer and UI/UX enthusiast with
              a strong passion for transforming ideas into clean, functional,
              and engaging digital experiences. I continuously strive to balance
              the visual side of design with the logical side of development,
              bridging creativity and code effectively.
            </p>
            <p>
              On the frontend, I focus on building responsive and interactive
              user interfaces using Next.js, React, TypeScript, and Tailwind
              CSS. On the backend, I have explored Node.js, Firebase, and
              Supabase to create scalable and real-time applications. I also
              enjoy exploring full-stack workflows and staying up to date with
              modern development practices and tools.
            </p>
            <p>
              My main drive is to craft intuitive user experiences that not only
              look great but also solve real problems. I prioritize
              accessibility, performance, and maintainable code, ensuring that
              digital products work seamlessly for everyone.
            </p>
            <p>
              In collaborative settings, I am an active listener, a proactive
              problem-solver, and open to constructive feedback. Whether working
              independently or as part of a team, I always aim to deliver
              thoughtful and reliable solutions that align with project
              objectives.
            </p>
            <p>
              I am excited about future opportunities to collaborate and
              contribute to the development of purposeful, user-centered digital
              products.
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
