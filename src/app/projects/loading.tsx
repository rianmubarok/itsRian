"use client";

import {
  ProjectCardSkeleton,
  ProjectsHeaderSkeleton,
} from "../../components/shared/ui/SkeletonLoader";

export default function ProjectsLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto my-48"
      role="main"
    >
      <div
        className="opacity-0 animate-fade-in-up"
        style={{
          animationDelay: "100ms",
          animationFillMode: "forwards",
        }}
      >
        <ProjectsHeaderSkeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
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
    </main>
  );
}
