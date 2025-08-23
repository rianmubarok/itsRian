import { MarkdownRenderer } from "@/components/shared/ui";
import { useMarkdownContent } from "@/hooks";
import MarkdownContentLoader from "@/components/blog/MarkdownContentLoader";

interface ProjectContentProps {
  project: {
    content: string;
  };
  hasMounted: boolean;
}

export default function ProjectContent({
  project,
  hasMounted,
}: ProjectContentProps) {
  const { markdownContent, isLoading, error, isFromUrl } = useMarkdownContent({
    content: project.content,
    language: "en", // Default to English for projects
  });

  return (
    <article
      className={`prose text-primary-dark dark:text-primary-light max-w-none mb-12 sm:mb-16 transition-all duration-700 ease-out delay-500 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
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
