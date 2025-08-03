import { ProjectCardSkeleton } from "../../components/ui/SkeletonLoader";

export default function ProjectsLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto my-48"
      role="main"
    >
      <div className="h-16 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProjectCardSkeleton key={item} />
        ))}
      </div>
    </main>
  );
}
