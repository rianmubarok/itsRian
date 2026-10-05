"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProjects } from "../../hooks";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";

interface OtherProjectsProps {
  currentProjectSlug: string;
  isProjectDetailLoading?: boolean;
  isCurrentExperiment?: boolean;
}

export default function OtherProjects({
  currentProjectSlug,
  isCurrentExperiment = false,
}: OtherProjectsProps) {
  const { projects } = useProjects();

  const otherStandardProjects = projects
    .filter(
      (p: Project) =>
        p.slug !== currentProjectSlug &&
        !p.tags.some((tag) => tag.toLowerCase() === "experiment")
    )
    .slice(0, 2);

  const otherExperimentProjects = projects
    .filter(
      (p: Project) =>
        p.slug !== currentProjectSlug &&
        p.tags.some((tag) => tag.toLowerCase() === "experiment")
    )
    .slice(0, 2);

  const renderSection = (
    title: string,
    href: string,
    items: Project[],
    fromTab: "projects" | "experiment"
  ) => {
    if (items.length === 0) return null;

    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-primary-dark dark:text-primary-light">
            {title}
          </h2>
          <Link
            href={href}
            className="group text-base sm:text-lg font-fraunces italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 text-primary-dark dark:text-primary-light"
            aria-label={`View all ${title}`}
          >
            <span>View all</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {items.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="grid"
              fromTab={fromTab}
            />
          ))}
        </div>
      </section>
    );
  };

  const standardSection = renderSection(
    "Other Projects",
    "/projects",
    otherStandardProjects,
    "projects"
  );

  const experimentSection = renderSection(
    "Other Experiments",
    "/projects/experiment",
    otherExperimentProjects,
    "experiment"
  );

  if (!standardSection && !experimentSection) return null;

  return (
    <div className="space-y-12">
      {isCurrentExperiment ? (
        <>
          {experimentSection}
          {standardSection}
        </>
      ) : (
        <>
          {standardSection}
          {experimentSection}
        </>
      )}
    </div>
  );
}
