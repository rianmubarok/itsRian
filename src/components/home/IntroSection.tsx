"use client";

import Image from "next/image";
import { useIntersectionObserver } from "../../hooks";

export default function IntroSection() {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <>
      <style>{`
        @keyframes wave-hand {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
      <section
        ref={ref}
        className="flex flex-col md:flex-row gap-4 w-full mb-24 border-b"
      >
        <article className="w-full md:basis-2/3 text-primary-dark dark:text-primary-light">
          <header className="flex items-center gap-4 mb-6">
            <figure
              className={`w-[60px] h-[60px] rounded-full overflow-hidden transition-all duration-700 ease-out ${
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
                "text-[32px]",
                "transition-all duration-700 ease-out delay-200",
                isIntersecting
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0",
              ].join(" ")}
            >
              Hey there, I'm Rian{" "}
              <span
                style={{
                  display: "inline-block",
                  transformOrigin: "70% 70%",
                  animation: "wave-hand 2s infinite",
                }}
                role="img"
                aria-label="waving hand"
              >
                👋
              </span>
            </p>
          </header>
          <h1
            className={`text-6xl font-medium leading-tight tracking-tight transition-all duration-700 ease-out delay-400 ${
              isIntersecting
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            a visual designer exploring the intersection of design and
            development
          </h1>
        </article>

        <aside className="mt-10 w-full md:basis-1/3 flex items-start md:items-end justify-start md:justify-end">
          <address
            className={`text-left md:text-right not-italic transition-all duration-700 ease-out delay-600 ${
              isIntersecting
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-base text-primary-gray">Based in</p>
            <p className="text-lg text-primary-dark dark:text-primary-light">
              Jepara, Indonesia
            </p>
          </address>
        </aside>
      </section>
    </>
  );
}
