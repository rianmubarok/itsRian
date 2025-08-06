"use client";

import { experiences } from "../../data/experiences";
import { useIntersectionObserver } from "../../hooks";

export default function AboutMePage() {
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

  const { ref: experienceRef, isIntersecting: experienceIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className={`grid grid-cols-1 md:grid-cols-5 gap-6 mb-6 transition-all duration-700 ease-out ${
          headerIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-[32px] leading-tight font-regular text-primary-dark dark:text-primary-light md:col-span-2">
          Hello! Thank you for visiting my personal website.
        </h2>
        <p className="text-primary-gray font-regular text-lg md:col-span-3">
          I'm Rian, a passionate web developer and UI/UX enthusiast who thrives
          on turning ideas into clean, functional, and engaging digital
          experiences. Over the years, I've dedicated myself to understanding
          both the visual side of design and the logical side of development —
          bridging creativity and code.
        </p>
      </div>

      {/* Profile Section */}
      <div
        ref={profileRef}
        className={`text-primary-gray font-regular text-lg space-y-4 transition-all duration-700 ease-out delay-300 ${
          profileIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <p>
          I specialize in building responsive websites and interactive user
          interfaces using technologies like JavaScript, TypeScript, React, and
          Tailwind CSS. On the backend, I’ve explored Node.js and Firebase for
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
          In collaborative environments, I’m a good listener, proactive
          problem-solver, and open to feedback. Whether working in a team or
          independently, I always aim to deliver thoughtful, reliable solutions
          that align with project goals.
        </p>
        <p>
          I'm excited about future opportunities to collaborate and build
          purposeful, user-centered digital products.
        </p>
        <p>Best regards,</p>
        <h2 className="tracking-normal mt-15 font-sacramento-signature font-regular text-5xl text-primary-dark dark:text-primary-light">
          Rian
        </h2>
      </div>

      <hr className="border-t border-primary-gray/20 my-12" />

      {/* Experience */}
      <div
        ref={experienceRef}
        className={`space-y-12 transition-all duration-700 ease-out delay-600 ${
          experienceIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="text-primary-dark font-regular dark:text-primary-light grid grid-cols-1 md:grid-cols-6 transition-all duration-700 ease-out"
            style={{
              transitionDelay: `${900 + index * 200}ms`,
              transform: experienceIntersecting
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: experienceIntersecting ? 1 : 0,
            }}
          >
            <h2 className="text-2xl md:col-span-2">{experience.period}</h2>
            <div className="md:col-span-4">
              <h2 className="text-2xl mb-4">
                {experience.company}, {experience.title}
              </h2>
              <div className="text-primary-gray text-lg space-y-4">
                <p className="text-sm font-light">
                  {experience.duration} • {experience.type} •{" "}
                  {experience.location}
                </p>
                <p>{experience.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
