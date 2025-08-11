"use client";

import Image from "next/image";
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
      <article className="w-full md:basis-2/3 text-primary-dark dark:text-primary-light">
        <header className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <figure
            className={`w-[30px] h-[30px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden transition-all duration-700 ease-out ${
              isIntersecting ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <Image
              src="/rian.jpg"
              alt="Rian - Visual Designer and Developer"
              width={60}
              height={60}
              className="w-full object-cover"
              priority
            />
          </figure>
          <p
            className={[
              "text-xl sm:text-2xl md:text-[32px]",
              "transition-all duration-700 ease-out delay-200",
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
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight transition-all duration-700 ease-out delay-400 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          a visual designer exploring the intersection of design and development
        </h1>
      </article>

      <aside className="mt-6 sm:mt-8 md:mt-10 w-full md:basis-1/3 flex items-start md:items-end justify-start md:justify-end">
        <address
          className={`text-left md:text-right not-italic transition-all duration-700 ease-out delay-600 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-sm sm:text-base text-primary-gray">Based in</p>
          <p className="text-base sm:text-lg text-primary-dark dark:text-primary-light">
            Jepara, Indonesia
          </p>
        </address>
      </aside>
    </section>
  );
}
