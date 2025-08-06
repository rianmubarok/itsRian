import { BlogCardSkeleton } from "../../../components/shared/ui/SkeletonLoader";
import Skeleton from "../../../components/shared/ui/SkeletonLoader";

export default function BlogDetailLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto mt-32 px-4 md:px-0"
      role="main"
    >
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-6 w-28 rounded" />
      </div>

      {/* Blog Header Skeleton */}
      <div className="mb-10 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        {/* Title */}
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        {/* Description */}
        <Skeleton className="h-6 w-2/3 rounded" />
        {/* Date */}
        <Skeleton className="h-5 w-32 rounded" />
      </div>

      {/* Blog Thumbnail Skeleton */}
      <div className="mb-10">
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>

      {/* Blog Content Skeleton */}
      <div className="space-y-4 mb-16">
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-5 ${i % 3 === 0 ? "w-4/5" : "w-full"} rounded`}
          />
        ))}
      </div>

      <hr className="border-t border-primary-gray my-12" />

      {/* Related Posts Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-48 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
