import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Blog } from "../../types";

interface BlogContentProps {
  blog: Blog;
  hasMounted: boolean;
  currentLanguage: "en" | "id";
}

export default function BlogContent({ 
  blog, 
  hasMounted, 
  currentLanguage 
}: BlogContentProps) {
  return (
    <article
      className={`prose text-primary-dark dark:text-primary-light max-w-none mb-12 sm:mb-16 transition-all duration-700 ease-out delay-500 ${
        hasMounted
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <div key={currentLanguage} className="text-base sm:text-lg leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content[currentLanguage]}
        </ReactMarkdown>
      </div>
    </article>
  );
} 