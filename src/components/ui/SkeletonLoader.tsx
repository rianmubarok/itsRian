"use client";

/**
 * Skeleton Loader Components
 *
 * Dark Mode Color Options:
 *
 * 1. Gray Scale (Current):
 *    - Light: bg-gray-200
 *    - Dark: bg-gray-800 (darker, more contrast)
 *
 * 2. Alternative Options:
 *    - Slate: bg-slate-200 dark:bg-slate-800
 *    - Zinc: bg-zinc-200 dark:bg-zinc-800
 *    - Neutral: bg-neutral-200 dark:bg-neutral-800
 *    - Stone: bg-stone-200 dark:bg-stone-800
 *
 * 3. Custom Colors:
 *    - Blue tint: bg-blue-100 dark:bg-blue-900
 *    - Purple tint: bg-purple-100 dark:bg-purple-900
 *    - Green tint: bg-green-100 dark:bg-green-900
 *
 * 4. Opacity Options:
 *    - bg-gray-200/50 dark:bg-gray-800/50 (50% opacity)
 *    - bg-gray-200/75 dark:bg-gray-800/75 (75% opacity)
 *
 * To change colors, replace all instances of:
 * - bg-gray-200 → your-light-color
 * - dark:bg-gray-800 → dark:your-dark-color
 */

export default function SkeletonLoader() {
  return (
    <main className="max-w-6xl mx-auto my-48 animate-pulse" role="main">
      {/* Intro Section Skeleton */}
      <section className="flex gap-4 w-full mb-24 border-b">
        <article className="basis-2/3">
          <header className="flex items-center gap-4 mb-6">
            <div className="w-[60px] h-[60px] rounded-full bg-gray-200 dark:bg-gray-800"></div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </header>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </article>
        <aside className="basis-1/3 flex items-end justify-end">
          <div className="text-right space-y-2">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </aside>
      </section>

      {/* Divider */}
      <hr className="border-t border-primary-gray my-12" />

      {/* Featured Projects Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex-shrink-0 w-[450px]">
                <div className="relative h-[300px] bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
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
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </section>
    </main>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>

      <div className="mt-8 space-y-3">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-5 w-5/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-5 w-4/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Content */}
        <div className="flex-1">
          {/* Meta info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="w-1 h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>

          {/* Title */}
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>

          {/* Read more button */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="flex-shrink-0 w-full md:w-48 h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-gray-300 dark:border-t-gray-700 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
