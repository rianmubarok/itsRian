"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { useProjects, useIntersectionObserver } from "../../hooks";
import { OtherProjectCardSkeleton } from "../shared/ui/SkeletonLoader";

interface OtherProjectsProps {
  currentProjectSlug: string;
  isProjectDetailLoading?: boolean;
}

export default function OtherProjects({
  currentProjectSlug,
  isProjectDetailLoading = false,
}: OtherProjectsProps) {
  const { projects, loading } = useProjects();

  const otherProjects = projects
    .filter((project) => project.slug !== currentProjectSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref}>
      <div className="flex items-center justify-between mb-4 sm:mb-6 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-2xl sm:text-3xl md:text-[32px] font-regular transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          View Other Projects
        </h2>
        <Link
          href="/projects"
          className={`group text-base sm:text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          View all projects
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {isProjectDetailLoading
          ? null // Don't show anything when project detail is loading
          : otherProjects.length === 0
          ? // Loading skeleton - only show when no other projects loaded yet
            Array.from({ length: 4 }).map((_, index) => (
              <OtherProjectCardSkeleton key={index} />
            ))
          : otherProjects.map((project, index) => (
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
    </section>
  );
}
