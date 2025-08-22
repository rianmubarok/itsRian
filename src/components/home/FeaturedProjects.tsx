"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "../project/ProjectCard";
import { useIntersectionObserver, useProjects } from "../../hooks";

export default function FeaturedProjects() {
  const { projects, loading } = useProjects();

  const featuredProjects = projects.slice(0, 4);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref} className="mb-12 sm:mb-16">
      <div className="flex items-center justify-between mb-6 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-2xl sm:text-3xl md:text-[32px] font-regular transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          My Featured Projects
        </h2>
        <Link
          href="/projects"
          className={`group text-base sm:text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300  ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          View all projects
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>

      {/* Scrollable Projects Container */}
      <div className="relative">
        <div
          className={`flex md:gap-6 gap-4 overflow-x-auto scrollbar-hide pb-4 cursor-pointer active:cursor-grabbing transition-all duration-700 ease-out delay-400 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          onMouseDown={(e) => {
            const container = e.currentTarget;
            const startX = e.pageX - container.offsetLeft;
            const scrollLeft = container.scrollLeft;

            const onMouseMove = (eMove: MouseEvent) => {
              const x = eMove.pageX - container.offsetLeft;
              const walk = (x - startX) * 1;
              container.scrollLeft = scrollLeft - walk;
            };

            const onMouseUp = () => {
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
        >
          {loading
            ? // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] bg-gray-200 dark:bg-white/50 rounded-xl animate-pulse"
                />
              ))
            : featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-700 ease-out`}
                  style={{
                    transitionDelay: `${600 + index * 100}ms`,
                    transform: isIntersecting
                      ? "translateY(0) scale(1)"
                      : "translateY(20px) scale(0.95)",
                    opacity: isIntersecting ? 1 : 0,
                  }}
                >
                  <ProjectCard project={project} variant="featured" />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
