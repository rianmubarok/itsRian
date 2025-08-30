"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

  const otherProjects = (() => {
    const pool = projects.filter(
      (project: Project) => project.slug !== currentProjectSlug
    );
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 2);
  })();

  if (otherProjects.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold leading-tight tracking-tighter">
          Other Projects
        </h2>
        <Link
          href="/projects"
          className="group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
          aria-label="View all projects"
        >
          <span>View all</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {otherProjects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} variant="grid" />
        ))}
      </div>
    </section>
  );
}
