import { MarkdownRenderer } from "@/components/shared/ui";
import { useMarkdownContent } from "@/hooks";
import MarkdownContentLoader from "@/components/shared/ui/MarkdownContentLoader";
import SeriesExperimentViewer from "./SeriesExperimentViewer";
import { Project } from "@/types";

interface ProjectContentProps {
  project: Project;
  hasMounted: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialManifest?: any;
}

export default function ProjectContent({
  project,
  hasMounted,
  initialManifest,
}: ProjectContentProps) {
  const isSeries =
    project.isSeries ||
    project.tags?.some((t) => t.toLowerCase() === "experiment");

  if (isSeries) {
    return (
      <SeriesExperimentViewer
        project={project}
        hasMounted={hasMounted}
        initialManifest={initialManifest}
      />
    );
  }

  const { markdownContent, isLoading, error, isFromUrl } = useMarkdownContent({
    content: project.content,
    language: "en",
  });

  return (
    <article
      className={`prose text-base tracking-normal text-primary-dark dark:text-primary-light max-w-none mb-12 sm:mb-16 transition-all duration-700 ease-out delay-500 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownContentLoader
          isLoading={isLoading}
          error={error}
          isFromUrl={isFromUrl}
        />
        {!isLoading && markdownContent && (
          <div className="animate-fadein">
            <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
          </div>
        )}
      </div>
    </article>
  );
}
