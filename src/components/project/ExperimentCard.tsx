import Link from "next/link";
import { Project } from "../../types/index";

interface ExperimentCardProps {
  project: Project;
  fromHome?: boolean;
  fromTab?: "projects" | "experiment";
}

export default function ExperimentCard({
  project,
  fromHome = false,
  fromTab = "experiment",
}: ExperimentCardProps) {
  const fromParam = fromHome
    ? "?from=home"
    : fromTab === "experiment"
    ? "?from=experiment"
    : "";
  const href = `/projects/${project.slug}${fromParam}`;

  return (
    <div
      className="group w-full border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300 h-full"
    >
      <div className="p-6 bg-primary-light dark:bg-primary-dark rounded-xl h-full flex flex-col justify-between">
        <div>
          <Link href={href}>
            <h3 className="tracking-tight text-2xl font-semibold mb-2 sm:mb-3 text-primary-dark dark:text-primary-light">
              {project.title}
            </h3>
          </Link>

          <p className="text-base text-primary-gray dark:text-gray-300 mb-4 overflow-hidden tracking-normal line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.tags.slice(0, 4).map((tag) => (
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
