import { BlogCardSkeleton } from "../../components/shared/ui/SkeletonLoader";

export default function BlogLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      {/* Featured Blog Rotator Skeleton */}
      <div className="mb-16">
        <div className="h-16 w-64 bg-gray-200 dark:bg-white/50 rounded mb-6 animate-pulse"></div>
        <div className="h-80 bg-gray-200 dark:bg-white/50 rounded-xl animate-pulse"></div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <BlogCardSkeleton key={item} />
        ))}
      </div>
    </main>
  );
}
