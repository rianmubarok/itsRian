"use client";

import Skills from "../shared/ui/Skills";
import { useIntersectionObserver } from "../../hooks";

const SkillsSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="space-y-4 sm:space-y-5 text-primary-dark dark:text-primary-light"
    >
      <div className="space-y-2 sm:space-y-3">
        <h2
          className={`text-2xl sm:text-3xl md:text-[32px] font-regular transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          Tools that I have used
        </h2>
      </div>
      <div
        className={`transition-all duration-700 ease-out delay-300 ${
          isIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <Skills />
      </div>
    </section>
  );
};

export default SkillsSection;
