import { MarkdownRenderer } from "@/components/shared/ui";
import { useMarkdownContent } from "@/hooks";
import MarkdownContentLoader from "./MarkdownContentLoader";

interface BlogContentProps {
  blog: {
    content: {
      en: string;
      id: string;
    };
  };
  hasMounted: boolean;
  currentLanguage: "en" | "id";
}

/**
 * BlogContent component that supports both inline markdown and external markdown URLs
 *
 * Features:
 * - Automatically detects if content is a URL (e.g., Supabase storage link)
 * - Fetches markdown content from external URLs
 * - Shows loading state while fetching
 * - Displays error messages if fetch fails
 * - Falls back to original content if fetch fails
 *
 * Usage:
 * - For inline markdown: Set content.en/content.id to markdown string
 * - For external markdown: Set content.en/content.id to URL like:
 *   "https://ftzpnbnmdyujffrxsjgs.supabase.co/storage/v1/object/public/markdown-content/making-your-website-come-alive.md"
 */
export default function BlogContent({
  blog,
  hasMounted,
  currentLanguage,
}: BlogContentProps) {
  const { markdownContent, isLoading, error, isFromUrl } = useMarkdownContent({
    content: blog.content[currentLanguage],
    language: currentLanguage,
  });

  return (
    <article
      className={`prose text-primary-dark dark:text-primary-light max-w-none mb-12 sm:mb-16 transition-all duration-700 ease-out delay-500 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        key={currentLanguage}
        className="text-base sm:text-lg leading-relaxed"
      >
        {/* Show loader or error message if fetching from URL */}
        <MarkdownContentLoader
          isLoading={isLoading}
          error={error}
          isFromUrl={isFromUrl}
        />

        {/* Show markdown content */}
        {!isLoading && markdownContent && (
          <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
        )}
      </div>
    </article>
  );
}
