import Skeleton from "../shared/ui/SkeletonLoader";

interface ProjectDetailSkeletonProps {
  hasMounted: boolean;
}

export default function ProjectDetailSkeleton({
  hasMounted,
}: ProjectDetailSkeletonProps) {
  return (
    <div className="space-y-8">
      {/* Back Button Skeleton */}
      <div
        className={`flex items-center gap-3 mb-6 sm:mb-8 transition-all duration-700 ease-out delay-100 ${
          hasMounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      >
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-32 rounded" />
      </div>

      {/* Project Header Skeleton - sesuai dengan ProjectDetailPageClient */}
      <div
        className={`mb-8 sm:mb-12 space-y-4 transition-all duration-700 ease-out delay-200 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Title */}
        <Skeleton className="h-16 w-full rounded-lg" />
        {/* Description */}
        <Skeleton className="h-6 w-3/4 rounded" />
      </div>

      {/* Project Thumbnail Skeleton - sesuai dengan ProjectDetailPageClient */}
      <div
        className={`mb-8 sm:mb-12 transition-all duration-700 ease-out delay-300 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>

      {/* Tech Stack Skeleton - sesuai dengan ProjectDetailPageClient */}
      <div
        className={`mb-6 sm:mb-8 transition-all duration-700 ease-out delay-400 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-6 w-32 rounded" />
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      {/* Project Content Skeleton */}
      <div
        className={`space-y-4 mb-16 transition-all duration-700 ease-out delay-500 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-5 ${i % 3 === 0 ? "w-4/5" : "w-full"} rounded`}
          />
        ))}
      </div>

      {/* Links Skeleton - sesuai dengan ProjectDetailPageClient */}
      <div
        className={`mt-20 sm:mt-24 md:mt-32 mb-12 sm:mb-16 transition-all duration-700 ease-out delay-600 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-2">
          <div className="px-5 py-3 rounded-full border border-primary-gray/20 bg-gray-100 dark:bg-primary-light/5 flex flex-wrap items-center gap-4 sm:gap-8">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
          </div>
          <Skeleton className="h-5 w-32 rounded" />
        </div>
      </div>

      <Skeleton className="h-px w-full my-8 sm:my-12" />

      {/* Other Projects Skeleton */}
      <section
        className={`mb-16 transition-all duration-700 ease-out delay-700 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48 rounded" />
          <Skeleton className="h-6 w-32 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <Skeleton key={item} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
