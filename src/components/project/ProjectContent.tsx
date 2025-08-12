import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Project } from "@/types";

interface ProjectContentProps {
  project: Project;
  hasMounted: boolean;
}

export default function ProjectContent({
  project,
  hasMounted,
}: ProjectContentProps) {
  return (
    <article
      className={`prose text-primary-dark dark:text-primary-light max-w-none mb-12 sm:mb-16 transition-all duration-700 ease-out delay-500 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="text-base sm:text-lg leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {project.detail}
        </ReactMarkdown>
      </div>
    </article>
  );
}
