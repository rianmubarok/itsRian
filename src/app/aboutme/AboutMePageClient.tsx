"use client";

import { experiences } from "../../data/experiences";
import { useIntersectionObserver } from "../../hooks";
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
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48"
      role="main"
    >
      <div
        ref={headerRef}
        className={`grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6 transition-all duration-700 ease-out ${
          headerIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-2xl sm:text-3xl leading-tight font-regular text-primary-dark dark:text-primary-light md:col-span-2">
          Hello! Thank you for visiting my personal website.
        </h2>
        <p className="font-regular text-base md:col-span-3 tracking-normal">
          I&apos;m Rian, a passionate web developer and UI/UX enthusiast who
          thrives on turning ideas into clean, functional, and engaging digital
          experiences. Over the years, I&apos;ve dedicated myself to
          understanding both the visual side of design and the logical side of
          development — bridging creativity and code.
        </p>
      </div>

      <div
        ref={profileRef}
        className={`tracking-normal font-regular text-base space-y-3 sm:space-y-4 transition-all duration-700 ease-out delay-300 ${
          profileIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <p>
          I specialize in building responsive websites and interactive user
          interfaces using technologies like JavaScript, TypeScript, React, and
          Tailwind CSS. On the backend, I've explored Node.js and Firebase for
          creating scalable, real-time applications. I also enjoy learning about
          full-stack workflows and staying updated with modern development tools
          and best practices.
        </p>
        <p>
          What drives me most is creating intuitive user experiences that not
          only look good but also solve real problems. I pay close attention to
          accessibility, performance, and maintainable code — because great
          interfaces should work well for everyone.
        </p>
        <p>
          In collaborative environments, I'm a good listener, proactive
          problem-solver, and open to feedback. Whether working in a team or
          independently, I always aim to deliver thoughtful, reliable solutions
          that align with project goals.
        </p>
        <p>
          I&apos;m excited about future opportunities to collaborate and build
          purposeful, user-centered digital products.
        </p>
        <p>Best regards,</p>
        <h2 className="tracking-normal mt-10 sm:mt-15 font-sacramento-signature font-regular text-3xl sm:text-4xl md:text-5xl text-primary-dark dark:text-primary-light">
          Rian
        </h2>
      </div>

      <hr className="border-t border-primary-gray/20 my-8 sm:my-12" />

      {/* Experience Section dengan Accordion */}
      <div className="mb-4">
        <SectionAccordion title="Experience" defaultOpen={true}>
          <ExperienceList />
        </SectionAccordion>
      </div>

      {/* Education Section dengan Accordion */}
      <div className="mb-4">
        <SectionAccordion title="Education">
          <EducationList />
        </SectionAccordion>
      </div>

      {/* License & Certification Section dengan Accordion */}
      <div className="mb-4">
        <SectionAccordion title="Licenses & Certifications">
          <LicenseList />
        </SectionAccordion>
      </div>
    </main>
  );
}
