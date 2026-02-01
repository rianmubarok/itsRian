"use client";

import { useState, useMemo } from "react";

import ProjectCard from "../../components/project/ProjectCard";
import {
  useInfiniteScroll,
  useIntersectionObserver,
  useProjects,
} from "../../hooks";
import { ProjectCardSkeleton } from "../../components/shared/ui/SkeletonLoader";

export default function ProjectsPageClient() {
  const { projects, loading, error } = useProjects();
  const [activeTab, setActiveTab] = useState<"projects" | "experiment">(
    "projects"
  );

  const { ref: headerRef, isIntersecting: headerIntersecting } =
    useIntersectionObserver<HTMLHeadingElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  // Filter projects based on activeTab
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeTab === "experiment") {
        return project.tags.some((tag) => tag.toLowerCase() === "experiment");
      }
      return !project.tags.some((tag) => tag.toLowerCase() === "experiment");
    });
  }, [projects, activeTab]);

  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    filteredProjects,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  if (error) {
    return (
      <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40">
        <div className="text-center">
          <p className="text-red-500">Error loading projects: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 px-6"
      role="main"
    >
      <h1
        ref={headerRef}
        className={`text-5xl font-semibold leading-tighter tracking-tighter mb-10 transition-all duration-700 ease-out ${headerIntersecting
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
          }`}
      >
        <span key={activeTab} className="animate-fade-only block">
          {activeTab === "projects"
            ? "Built or being built with real-world intention"
            : "Built to explore, learn, and understand"}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="flex flex-col space-y-2 sticky top-32">
            <button
              onClick={() => setActiveTab("projects")}
              className={`text-left text-lg transition-colors duration-200 cursor-pointer ${activeTab === "projects"
                ? "text-primary-dark dark:text-primary-light font-medium"
                : "text-primary-gray dark:text-gray-400 hover:text-primary-dark dark:hover:text-primary-light"
                }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("experiment")}
              className={`text-left text-lg transition-colors duration-200 cursor-pointer ${activeTab === "experiment"
                ? "text-primary-dark dark:text-primary-light font-medium"
                : "text-primary-gray dark:text-gray-400 hover:text-primary-dark dark:hover:text-primary-light"
                }`}
            >
              Experiment
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-5">
          {(loading || (isLoading && displayedItems.length === 0)) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          ) : displayedItems.length > 0 ? (
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
          ) : activeTab === "experiment" ? (
            <p className="text-primary-gray dark:text-gray-400 italic">Soon</p>
          ) : null}

          {isLoading && displayedItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
              {[1, 2].map((item, index) => (
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

          {hasMore && <div ref={loadingRef} className="h-20" />}
        </div>
      </div>
    </main>
  );
}
