"use client";

import { projects } from "../../data";
import ProjectCard from "../../components/project/ProjectCard";
import {
  useInfiniteScroll,
  useIntersectionObserver,
  useInfiniteScrollAnimation,
} from "../../hooks";
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

  const { ref: headerRef, isIntersecting: headerIntersecting } =
    useIntersectionObserver<HTMLHeadingElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: gridRef, isIntersecting: gridIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { getItemAnimationProps } = useInfiniteScrollAnimation(
    displayedItems,
    gridIntersecting
  );

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      <h1
        ref={headerRef}
        className={`text-6xl font-medium leading-snug tracking-tight mb-6 transition-all duration-700 ease-out ${
          headerIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        All Projects
      </h1>

      <div
        ref={gridRef}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-out delay-300 ${
          gridIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {displayedItems.map((project, index) => {
          const animationProps = getItemAnimationProps(project, index);

          return (
            <div
              key={project.id}
              className={animationProps.className}
              style={animationProps.style}
            >
              <ProjectCard project={project} variant="grid" />
            </div>
          );
        })}
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
