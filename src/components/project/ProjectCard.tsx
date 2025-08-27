import Link from "next/link";
import { Project } from "../../types/index";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "grid";
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group w-full border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300">
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] overflow-hidden rounded-xl">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="-mt-4 pt-10 p-6 bg-primary-light dark:bg-primary-dark rounded-b-xl">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-2xl font-semibold mb-2 sm:mb-3 text-primary-dark dark:text-primary-light">
            {project.title}
          </h3>
        </Link>

        <p className="text-base text-primary-gray dark:text-gray-300 mb-3 sm:mb-4 overflow-hidden tracking-normal">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 text-sm rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
