import Link from "next/link";
import { useState } from "react";
import { Project } from "../../types/index";
import CollageRotator from "../shared/ui/CollageRotator";
import Skeleton from "../shared/ui/SkeletonLoader";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "grid";
  fromHome?: boolean;
}

export default function ProjectCard({
  project,
  variant = "grid",
  fromHome = false,
}: ProjectCardProps) {
  const href = `/projects/${project.slug}${fromHome ? "?from=home" : ""}`;

  return (
    <div
      className={`group w-full border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300`}
    >
      <Link href={href}>
        <div
          className={`relative overflow-hidden rounded-xl bg-primary-light dark:bg-primary-dark ${
            variant === "grid"
              ? "h-[280px] sm:h-[320px]"
              : "h-[280px] sm:h-[320px]"
          }`}
        >
          {project.resources1 &&
          project.resources2 &&
          project.resources1.length > 0 &&
          project.resources2.length > 0 ? (
            <div className="w-full h-full transition-transform duration-300 flex justify-center items-center gap-0">
              <CollageRotator
                images={project.resources1.map((src) => ({ src }))}
                direction="vertical"
                columns={1}
                imageSize={160}
                gap={6}
                containerClassName=""
              />
              <CollageRotator
                images={project.resources2.map((src) => ({ src }))}
                direction="vertical"
                columns={1}
                imageSize={160}
                gap={6}
                containerClassName=""
              />
            </div>
          ) : (
            <>
              {/* Thumbnail with loading skeleton */}
              <ThumbnailWithSkeleton
                src={project.thumbnail}
                alt={project.title}
              />
            </>
          )}
        </div>
      </Link>

      <div className="-mt-4 pt-10 p-6 bg-primary-light dark:bg-primary-dark rounded-b-xl">
        <Link href={href}>
          <h3 className="tracking-tight text-2xl font-semibold mb-2 sm:mb-3 text-primary-dark dark:text-primary-light">
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

interface ThumbnailWithSkeletonProps {
  src: string;
  alt: string;
}

function ThumbnailWithSkeleton({ src, alt }: ThumbnailWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full">
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        } group-hover:scale-105`}
      />
      {/* Skeleton overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    </div>
  );
}
