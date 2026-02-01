import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-white/50 rounded ${className}`}
    />
  );
};

export const BlogCardSkeleton = () => {
  return (
    <article className="group w-full border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300">
      <div className="relative h-[200px] sm:h-[250px] overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      <div className="-mt-4 pt-10 p-6 bg-primary-light dark:bg-primary-dark rounded-b-xl">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />

        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <Skeleton className="h-4 w-24" />
          <span className="w-1 h-1 bg-primary-gray rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </article>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="group w-full border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5 duration-300">
      <div className="relative h-[280px] overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      <div className="-mt-4 pt-10 p-6 bg-primary-light dark:bg-primary-dark rounded-b-xl">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-5 w-full mb-3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );
};

export const AboutMeSkeleton = () => {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40"
      role="main"
    >
      {/* Profile Article Section */}
      <article className="border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-6 bg-gray-100 dark:bg-primary-light/5">
        <div className="tracking-normal font-regular text-base space-y-3 sm:space-y-4">
          {/* Paragraph skeletons */}
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/4" />
          {/* Signature skeleton */}
          <Skeleton className="h-12 w-24 mt-10 sm:mt-15" />
        </div>
      </article>

      {/* Divider */}
      <Skeleton className="h-px w-full my-8 sm:my-12" />

      {/* Experience Accordion Skeleton */}
      <div className="mb-4">
        <div className="border border-primary-gray/20 rounded-[18px] md:rounded-[20px] overflow-hidden bg-gray-100 dark:bg-primary-light/5">
          {/* Accordion Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="w-6 h-6 rounded" />
          </div>
          {/* Accordion Content */}
          <div className="px-6 pb-6">
            <div className="pt-4 border-t border-primary-gray/10">
              <div className="space-y-8 sm:space-y-12">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start"
                  >
                    <div className="md:col-span-2">
                      <Skeleton className="h-10 w-32 rounded-full" />
                    </div>
                    <div className="md:col-span-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Accordion Skeleton */}
      <div className="mb-4">
        <div className="border border-primary-gray/20 rounded-[18px] md:rounded-[20px] overflow-hidden bg-gray-100 dark:bg-primary-light/5">
          {/* Accordion Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="w-6 h-6 rounded" />
          </div>
          {/* Accordion Content */}
          <div className="px-6 pb-6">
            <div className="pt-4 border-t border-primary-gray/10">
              <div className="space-y-8 sm:space-y-12">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start"
                  >
                    <div className="md:col-span-2">
                      <Skeleton className="h-10 w-32 rounded-full" />
                    </div>
                    <div className="md:col-span-4 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* License & Certification Accordion Skeleton */}
      <div className="mb-4">
        <div className="border border-primary-gray/20 rounded-[18px] md:rounded-[20px] overflow-hidden bg-gray-100 dark:bg-primary-light/5">
          {/* Accordion Header */}
          <div className="px-6 py-4 flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="w-6 h-6 rounded" />
          </div>
          {/* Accordion Content */}
          <div className="px-6 pb-6">
            <div className="pt-4 border-t border-primary-gray/10">
              <div className="space-y-8 sm:space-y-12">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start"
                  >
                    <div className="md:col-span-2">
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="md:col-span-4 space-y-4">
                      <Skeleton className="h-7 w-3/4" />
                      <Skeleton className="h-7 w-1/2" />
                      <Skeleton className="h-7 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const ContactSkeleton = () => {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-4"
      role="main"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Header */}
        <div className="md:col-span-2 space-y-8 mb-12">
          <Skeleton className="h-12 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-18" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <div className="space-y-12">
            <div>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </main>
  );
};

export const GuestbookSkeleton = () => {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40"
      role="main"
    >
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 mb-4 sm:mb-6 transition-all duration-700 ease-out opacity-0 animate-fadein">
        {/* Header */}
        <div className="lg:col-span-3 space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <Skeleton className="h-8 sm:h-10 w-3/4" />
          <div className="space-y-2 sm:space-y-3">
            <Skeleton className="h-3 sm:h-4 w-1/2" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
        {/* Message List */}
        <div className="lg:col-span-3 max-w">
          <div className="sm:h-[25rem] md:h-[30rem] overflow-y-auto space-y-3 sm:space-y-4 pr-3 sm:pr-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
          {/* Message Input Skeleton */}
          <div className="my-4 sm:my-6">
            <div className="flex gap-2 items-start flex-wrap min-h-[32px] p-2 sm:p-3 border border-gray-300 dark:border-primary-gray rounded-xl bg-white dark:bg-white/10">
              <Skeleton className="flex-1 min-w-[80px] h-5" />
              <Skeleton className="ml-2 h-7 sm:h-8 w-16 rounded-lg flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const FeaturedBlogRotatorSkeleton = () => {
  return (
    <div
      className="mb-4 hidden lg:block opacity-0 animate-fade-in-up"
      style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
    >
      <div className="group border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-2 bg-gray-100 dark:bg-primary-light/5">
        <div className="flex flex-col lg:flex-row gap-4 bg-primary-light dark:bg-primary-dark rounded-xl">
          {/* Content Skeleton */}
          <div className="flex-1 flex flex-col justify-between p-6">
            {/* Title Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-12 w-1/2" />
            </div>

            {/* Meta info Skeleton */}
            <div className="flex items-center gap-3 mt-4">
              <Skeleton className="h-4 w-20" />
              <span className="w-1 h-1 bg-primary-gray rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Thumbnail Skeleton */}
          <div className="flex-shrink-0 w-full lg:w-120 h-60 sm:h-72 md:h-80 overflow-hidden rounded-xl">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsHeaderSkeleton = () => {
  return <Skeleton className="h-16 w-64 mb-6" />;
};

export const OtherProjectCardSkeleton = () => {
  return (
    <div className="min-w-[300px] h-64">
      <Skeleton className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Skeleton;
