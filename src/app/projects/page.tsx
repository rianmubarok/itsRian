"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../lib/projects";

export default function ProjectsPage() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 mb-48"
      role="main"
    >
      <h1 className="text-6xl font-medium leading-snug tracking-tight mb-6">
        All Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="block transition-all duration-300 overflow-hidden group"
          >
            {/* Image (clickable) */}
            <Link href={`/projects/${project.slug}`}>
              <div className="relative h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-2xl font-regular">
                    View Details
                  </span>
                  <ArrowUpRight className="text-white w-10 h-10 stroke-1" />
                </div>
              </div>
            </Link>

            {/* Title */}
            <Link href={`/projects/${project.slug}`}>
              <h2 className="text-2xl font-regular mt-8 mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                {project.title}
              </h2>
            </Link>

            {/* Description */}
            <p className="text-lg text-primary-gray mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 text-sm font-light rounded-full border border-primary-dark dark:border-primary-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
