import { MarkdownRenderer } from "@/components/shared/ui";

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
        <MarkdownRenderer>{blog.content[currentLanguage]}</MarkdownRenderer>
      </div>
    </article>
  );
}
