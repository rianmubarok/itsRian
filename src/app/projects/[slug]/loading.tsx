export default function ProjectDetailLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto my-48"
      role="main"
    >
      <div className="animate-pulse">
        {/* Back Button */}
        <div className="mb-8">
          <div className="h-6 w-32 bg-gray-200 dark:bg-white/50 rounded"></div>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="h-16 w-3/4 bg-gray-200 dark:bg-white/50 rounded mb-6"></div>
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-white/50 rounded"></div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <div className="relative h-96 bg-gray-200 dark:bg-white/50 rounded-2xl"></div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="h-8 w-24 bg-gray-200 dark:bg-white/50 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-20 bg-gray-200 dark:bg-white/50 rounded-full"></div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-white/50 rounded-full"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-white/50 rounded-full"></div>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4 mb-12">
          <div className="h-5 w-full bg-gray-200 dark:bg-white/50 rounded"></div>
          <div className="h-5 w-5/6 bg-gray-200 dark:bg-white/50 rounded"></div>
          <div className="h-5 w-4/6 bg-gray-200 dark:bg-white/50 rounded"></div>
        </div>

        {/* Project Links & Date */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-6 w-24 bg-gray-200 dark:bg-white/50 rounded"></div>
            <div className="h-6 w-4 bg-gray-200 dark:bg-white/50 rounded"></div>
            <div className="h-6 w-28 bg-gray-200 dark:bg-white/50 rounded"></div>
          </div>
          <div className="h-5 w-32 bg-gray-200 dark:bg-white/50 rounded"></div>
        </div>
      </div>

      {/* Other Projects Section Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-white/50 rounded"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-white/50 rounded"></div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex-shrink-0 w-[450px]">
                <div className="relative h-[300px] bg-gray-200 dark:bg-white/50 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
