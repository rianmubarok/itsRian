import Skeleton from "../shared/ui/SkeletonLoader";
import { BlogCardSkeleton } from "../shared/ui/SkeletonLoader";

interface BlogSkeletonProps {
  hasMounted: boolean;
}

export default function BlogSkeleton({ hasMounted }: BlogSkeletonProps) {
  return (
    <div className="space-y-8">
      {/* Back Button Skeleton */}
      <div
        className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out delay-100 ${
          hasMounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
      >
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-28 rounded" />
      </div>

      {/* Blog Header Skeleton - sesuai dengan BlogHeader.tsx */}
      <div
        className={`mb-8 sm:mb-12 space-y-4 transition-all duration-700 ease-out delay-200 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Title */}
        <Skeleton className="h-16 w-full rounded-lg" />
        {/* Description */}
        <Skeleton className="h-6 w-3/4 rounded" />
        {/* Date dan Metrics */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <Skeleton className="h-4 w-32 rounded" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-20 rounded" />
            <span className="w-1 h-1 bg-primary-gray rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>
      </div>

      {/* Blog Thumbnail Skeleton */}
      <div
        className={`mb-6 sm:mb-8 transition-all duration-700 ease-out delay-300 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>

      {/* Blog Tags Skeleton - sesuai dengan BlogTags.tsx */}
      <div
        className={`mb-6 sm:mb-8 transition-all duration-700 ease-out delay-400 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          {/* Language Switcher */}
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      {/* Blog Content Skeleton */}
      <div
        className={`space-y-4 mb-16 transition-all duration-700 ease-out delay-500 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-5 ${i % 3 === 0 ? "w-4/5" : "w-full"} rounded`}
          />
        ))}
      </div>

      <Skeleton className="h-px w-full my-12" />

      {/* Related Posts Skeleton */}
      <section
        className={`mb-16 transition-all duration-700 ease-out delay-600 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
