"use client";

import { useProjects } from "../../hooks";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";

interface OtherProjectsProps {
  currentProjectSlug: string;
  isProjectDetailLoading: boolean;
}

export default function OtherProjects({
  currentProjectSlug,
  isProjectDetailLoading,
}: OtherProjectsProps) {
  const { projects } = useProjects();

  const otherProjects = projects
    .filter((project: Project) => project.slug !== currentProjectSlug)
    .slice(0, 4);

  if (otherProjects.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tighter">
          Other Projects
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary-gray">View all</span>
          <div className="w-8 h-8 rounded-full bg-primary-gray/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {otherProjects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} variant="grid" />
        ))}
      </div>
    </section>
  );
}
