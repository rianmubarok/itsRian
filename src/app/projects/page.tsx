"use client";

import { projects } from "../../data";
import ProjectCard from "../../components/project/ProjectCard";
import { useInfiniteScroll } from "../../hooks";
import {
  ProjectCardSkeleton,
  LoadingSpinner,
} from "../../components/shared/ui/SkeletonLoader";

export default function ProjectsPage() {
  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    projects,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      <h1 className="text-6xl font-medium leading-snug tracking-tight mb-6">
        All Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedItems.map((project) => (
          <ProjectCard key={project.id} project={project} variant="grid" />
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {[1, 2, 3, 4].map((item) => (
            <ProjectCardSkeleton key={item} />
          ))}
        </div>
      )}

      {/* Intersection observer target */}
      {hasMore && (
        <div
          ref={loadingRef}
          className="h-20 flex items-center justify-center mt-8"
        >
          <div className="flex items-center gap-3 text-primary-gray text-sm">
            <LoadingSpinner />
            <span>Loading more projects...</span>
          </div>
        </div>
      )}
    </main>
  );
}
