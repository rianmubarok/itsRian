"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "../../data";
import ProjectCard from "./ProjectCard";
import { useIntersectionObserver } from "../../hooks";

interface OtherProjectsProps {
  currentProjectSlug: string;
}

export default function OtherProjects({
  currentProjectSlug,
}: OtherProjectsProps) {
  const otherProjects = projects
    .filter((project) => project.slug !== currentProjectSlug)
    .sort(() => Math.random() - 0.5) // Shuffle array
    .slice(0, 4);

  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref}>
      <div className="flex items-center justify-between mb-6 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-[32px] font-regular transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          View Other Projects
        </h2>
        <Link
          href="/projects"
          className={`group text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          View all projects
          <ArrowRight className="w-6 h-6 stroke-1" />
        </Link>
      </div>

      {/* Scrollable Projects Container */}
      <div className="relative">
        <div
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-pointer active:cursor-grabbing transition-all duration-700 ease-out delay-400 ${
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
          {otherProjects.map((project, index) => (
            <div
              key={project.id}
              className="transition-all duration-700 ease-out"
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
