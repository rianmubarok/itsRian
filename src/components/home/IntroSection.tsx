"use client";

import { useIntersectionObserver } from "../../hooks";
import { WavingHandIcon } from "../../components/shared/ui";
import "../../styles/animations.css";

export default function IntroSection() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="flex flex-col gap-4 w-full mb-16 sm:mb-20 md:mb-24 border-b"
    >
      <article className="text-primary-dark dark:text-primary-light sm:text-center sm:px-16">
        <header className="flex sm:items-center sm:justify-center gap-3 sm:gap-4">
          <p
            className={[
              "text-base lg:text-xl transition-all duration-700 ease-out delay-200 font-noto-serif-display italic",
              isIntersecting
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0",
            ].join(" ")}
          >
            Hey there, I&apos;m Rian{" "}
            <WavingHandIcon
              size={24}
              className="wave-hand relative -translate-y-1"
            />
          </p>
        </header>
        <h1
          className={`text-5xl lg:text-6xl font-semibold leading-tight tracking-tighter transition-all duration-700 ease-out delay-400 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          Bridging design with development
        </h1>
      </article>
    </section>
  );
}
