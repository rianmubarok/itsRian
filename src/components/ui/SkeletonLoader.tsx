"use client";

export default function SkeletonLoader() {
  return (
    <main className="max-w-6xl mx-auto my-48 animate-pulse" role="main">
      {/* Intro Section Skeleton */}
      <section className="flex gap-4 w-full mb-24 border-b">
        <article className="basis-2/3">
          <header className="flex items-center gap-4 mb-6">
            <div className="w-[60px] h-[60px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </header>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </article>
        <aside className="basis-1/3 flex items-end justify-end">
          <div className="text-right space-y-2">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </aside>
      </section>

      {/* Divider */}
      <hr className="border-t border-primary-gray my-12" />

      {/* Featured Projects Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex-shrink-0 w-[450px]">
                <div className="relative h-[300px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-primary-gray my-12" />

      {/* Latest Article Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </section>
    </main>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>

      <div className="mt-8 space-y-3">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-5 w-4/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
