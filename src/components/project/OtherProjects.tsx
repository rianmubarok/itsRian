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
    .slice(0, 2);

  const { ref, isIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref}>
      <div className="sm:text-center mb-10 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-5xl font-semibold leading-tight tracking-tighter transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          Other Projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {isProjectDetailLoading
          ? null
          : otherProjects.length === 0
          ? Array.from({ length: 2 }).map((_, index) => (
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
