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
    <div className="bg-white dark:bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-white/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden min-w-[300px]">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
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
    <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48" role="main">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <Skeleton className="h-12 w-full md:col-span-2" />
        <Skeleton className="h-24 w-full md:col-span-3" />
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-16 w-32" />
      </div>

      <Skeleton className="h-px w-full my-12" />

      {/* Experience */}
      <div className="grid grid-cols-1 md:grid-cols-6">
        <Skeleton className="h-8 w-48 md:col-span-2" />
        <div className="md:col-span-4 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </div>
    </main>
  );
};

export const ContactSkeleton = () => {
  return (
    <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48" role="main">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
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

export default Skeleton;
