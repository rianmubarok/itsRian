import { SkeletonLoader } from "@/components/shared/ui";

interface MarkdownContentLoaderProps {
  isLoading: boolean;
  error: string | null;
  isFromUrl: boolean;
}

export default function MarkdownContentLoader({
  isLoading,
  error,
  isFromUrl,
}: MarkdownContentLoaderProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonLoader className="h-8 w-3/4" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-4 w-4/5" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-4 w-4/5" />
      </div>
    );
  }

  if (error && isFromUrl) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Error Loading Content
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>
                Failed to load content from external source. Please try refreshing the page or contact support if the problem persists.
              </p>
              {error && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-red-600 dark:text-red-400 hover:text-red-500">
                    Technical Details
                  </summary>
                  <p className="mt-1 font-mono text-xs bg-red-100 dark:bg-red-900/30 p-2 rounded">
                    {error}
                  </p>
                </details>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 