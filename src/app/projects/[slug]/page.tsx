import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../../../lib/projects";
import { notFound } from "next/navigation";
import { use } from "react";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto mt-24 mb-48"
      role="main"
    >
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-lg font-light mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-6 h-6 stroke-1" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-medium leading-tight tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-primary-gray mb-6 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Project Image */}
      <div className="mb-12">
        <div className="relative h-auto bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        <h2 className="text-2xl font-regular">Tech Stack :</h2>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1 text-sm font-light rounded-full border border-primary-dark dark:border-primary-light flex items-center"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-lg leading-relaxed text-primary-gray">
        {project.detail}
      </p>

      <div className="mt-12 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-2 w-full">
        <div className="text-lg text-primary-dark dark:text-primary-light font-light flex flex-wrap items-center gap-8">
          {project.sourceCode && (
            <Link
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-3"
            >
              <Github className="w-6 h-6 stroke-1" />
              Source Code
            </Link>
          )}

          {project.sourceCode && project.liveProject && (
            <span className="text-primary-gray">|</span>
          )}

          {project.liveProject && (
            <Link
              href={project.liveProject}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-3"
            >
              <ExternalLink className="w-6 h-6 stroke-1" />
              Live Project
            </Link>
          )}
        </div>

        <span className="text-base text-primary-gray mt-2 md:mt-0 md:text-right">
          Created:{" "}
          {new Date(project.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </main>
  );
}
