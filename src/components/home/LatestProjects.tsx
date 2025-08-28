"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "../project/ProjectCard";
import { useIntersectionObserver, useProjects } from "../../hooks";
import { ProjectCardSkeleton } from "../shared/ui/SkeletonLoader";

export default function LatestProjects() {
  const { projects, loading } = useProjects();

  const latestProjects = projects.slice(0, 2);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref} className="mb-12 sm:mb-16">
      <div className="sm:text-center mb-10 text-primary-dark dark:text-primary-light">
        <p className="text-base lg:text-lg font-noto-serif-display italic">
          Highlight
        </p>
        <h2
          className={`text-5xl font-semibold leading-tight tracking-tighter transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          Latest projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {loading
          ? Array.from({ length: 2 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          : latestProjects.map((project, index) => (
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

      <div className="text-center">
        <Link
          href="/projects"
          className={`group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          See all projects
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>
    </section>
  );
}
