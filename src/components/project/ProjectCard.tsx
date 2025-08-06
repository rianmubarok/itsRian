import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../types/index";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "grid";
}

export default function ProjectCard({
  project,
  variant = "grid",
}: ProjectCardProps) {
  if (variant === "featured") {
    return (
      <div className="flex-shrink-0 w-[450px] group">
        <Link href={`/projects/${project.slug}`}>
          <div className="relative h-[300px] bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl">
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Container - positioned at bottom with flex layout */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-20">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 text-sm font-light rounded-full border border-white/30 bg-white/20 backdrop-blur-sm text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Icon */}
              <div className="flex items-start justify-between">
                <h3 className="text-white text-2xl font-regular flex-1">
                  {project.title}
                </h3>
                <ArrowUpRight className="text-white w-10 h-10 stroke-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-3" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Grid variant for projects page
  return (
    <div className="block transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-80 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content Container - positioned at bottom with flex layout */}
          <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-20">
            {/* Title & Icon */}
            <div className="flex items-start justify-between">
              <span className="text-white text-2xl font-regular flex-1">
                View Details
              </span>
              <ArrowUpRight className="text-white w-10 h-10 stroke-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-3" />
            </div>
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
  );
}
