"use client";

import ProjectCard from "../../components/project/ProjectCard";
import {
  useInfiniteScroll,
  useIntersectionObserver,
  useProjects,
} from "../../hooks";
import {
  ProjectCardSkeleton,
  LoadingSpinner,
} from "../../components/shared/ui/SkeletonLoader";

export default function ProjectsPageClient() {
  const { projects, loading, error } = useProjects();

  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    projects,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  const { ref: headerRef, isIntersecting: headerIntersecting } =
    useIntersectionObserver<HTMLHeadingElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48"
      role="main"
    >
      <h1
        ref={headerRef}
        className={`sm:text-center text-5xl font-semibold leading-tight tracking-tighter mb-10 transition-all duration-700 ease-out ${
          headerIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        All Projects
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "forwards",
              }}
            >
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500">Error loading projects: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedItems.map((project, index) => {
            return (
              <div
                key={project.id}
                className="opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <ProjectCard project={project} variant="grid" />
              </div>
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      )}

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
