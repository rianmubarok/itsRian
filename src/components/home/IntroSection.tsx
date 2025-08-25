"use client";

import { useIntersectionObserver } from "../../hooks";
import "../../styles/animations.css";

export default function IntroSection() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="flex flex-col md:flex-row gap-4 w-full mb-16 sm:mb-20 md:mb-24 border-b"
    >
      <article className="text-primary-dark dark:text-primary-light text-center px-10">
        <header className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <p
            className={[
              "text-xl sm:text-2xl",
              "transition-all duration-700 ease-out delay-200 font-noto-serif-display italic",
              isIntersecting
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0",
            ].join(" ")}
          >
            Hey there, I&apos;m Rian{" "}
            <span className="wave-hand" role="img" aria-label="waving hand">
              👋
            </span>
          </p>
        </header>
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-manrope font-medium leading-tight tracking-tight transition-all duration-700 ease-out delay-400 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          I like exploring the intersection of design and development
        </h1>
      </article>
    </section>
  );
}
