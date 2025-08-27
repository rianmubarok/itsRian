import { LanguageSwitcher } from "../../shared/ui";
import { Blog } from "../../../types";

interface BlogTagsProps {
  blog: Blog;
  hasMounted: boolean;
  currentLanguage: "en" | "id";
  onLanguageChange: (language: "en" | "id") => void;
}

export default function BlogTags({
  blog,
  hasMounted,
  currentLanguage,
  onLanguageChange,
}: BlogTagsProps) {
  return (
    <div
      className={`mb-6 sm:mb-8 transition-all duration-700 ease-out delay-400 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 text-sm rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5 items-center"
            >
              {tag}
            </span>
          ))}
        </div>
        <LanguageSwitcher
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </div>
  );
}
