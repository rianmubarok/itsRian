"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "../../lib/projects";
import ProjectCard from "./ProjectCard";

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

  return (
    <section>
      <div className="flex items-center justify-between mb-6 text-primary-dark dark:text-primary-light">
        <h2 className="text-[32px] font-regular">View Other Projects</h2>
        <Link
          href="/projects"
          className="text-lg font-light inline-flex items-center gap-2"
        >
          View all projects
          <ArrowRight className="w-6 h-6 stroke-1" />
        </Link>
      </div>

      {/* Scrollable Projects Container */}
      <div className="relative">
        <div
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-pointer active:cursor-grabbing"
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
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="featured"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
