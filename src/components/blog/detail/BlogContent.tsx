import { MarkdownRenderer } from "@/components/shared/ui";
import { useMarkdownContent } from "@/hooks";
import MarkdownContentLoader from "@/components/shared/ui/MarkdownContentLoader";

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
      className={`prose text-primary-dark dark:text-primary-light max-w-none mb-12 sm:mb-16 transition-all duration-700 ease-out delay-500 tracking-normal text-base ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        key={currentLanguage}
        className="text-base sm:text-lg leading-relaxed"
      >
        <MarkdownContentLoader
          isLoading={isLoading}
          error={error}
          isFromUrl={isFromUrl}
        />
        {!isLoading && markdownContent && (
          <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
        )}
      </div>
    </article>
  );
}
