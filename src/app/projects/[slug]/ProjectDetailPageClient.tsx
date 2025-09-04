"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "../../../types";
import { getProjectBySlug } from "../../../data/projects";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { formatDate } from "../../../utils";
import OtherProjects from "../../../components/project/OtherProjects";
import ProjectContent from "@/components/project/detail/ProjectContent";
import ProjectDetailSkeleton from "../../../components/project/ProjectDetailSkeleton";
import { useProjectAnimation } from "../../../hooks";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectDetailPageClient({
  params,
}: ProjectDetailPageProps) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { showContent, handleContentShow, refs, hasMounted } =
    useProjectAnimation();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        if (!projectData) {
          notFound();
        }
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    handleContentShow(isLoading, project);
  }, [isLoading, project, handleContentShow]);

  useEffect(() => {
    if (!showContent) {
      document.body.classList.add("hide-footer");
    } else {
      document.body.classList.remove("hide-footer");
    }
    return () => {
      document.body.classList.remove("hide-footer");
    };
  }, [showContent]);

  if (!isLoading && !project) {
    notFound();
  }

  return (
    <main
      className="relative max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 min-h-screen text-primary-dark dark:text-primary-light"
      role="main"
    >
      <div
        className={`absolute inset-0 w-full min-h-full z-10 bg-primary-light/80 dark:bg-primary-dark/80 transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ProjectDetailSkeleton hasMounted={hasMounted} />
      </div>

      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {!project ? null : (
          <>
            <Link
              ref={refs.backButtonRef}
              href="/projects"
              className="group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 mb-6 sm:mb-8"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
              Back to projects
            </Link>

            <div ref={refs.headerRef} className="mb-8 sm:mb-12">
              <h1 className="text-5xl font-semibold leading-tighter tracking-tighter mb-4">
                {project.title}
              </h1>
              <p className="text-base text-primary-dark dark:text-gray-300 mb-4 sm:mb-6 tracking-normal">
                {project.description}
              </p>
            </div>

            <div ref={refs.imageRef} className="mb-8 sm:mb-12">
              <div className="relative h-auto bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              ref={refs.tagsRef}
              className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <h2 className="text-base sm:text-lg font-noto-serif-display italic">
                Tech Stack :
              </h2>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 text-sm rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5 items-center"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div ref={refs.contentRef}>
              <ProjectContent project={project} hasMounted={showContent} />
            </div>

            <div
              ref={refs.linksRef}
              className="mt-20 sm:mt-24 md:mt-32 mb-12 sm:mb-16 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 sm:gap-2 w-full "
            >
              <div className="px-5 py-3 rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5 flex flex-wrap items-center gap-4 sm:gap-8">
                {project.sourceCode && (
                  <Link
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
                    <span>Source Code</span>
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
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
                    <span>Live Project</span>
                  </Link>
                )}

                {!project.sourceCode && !project.liveProject && (
                  <p className="text-sm sm:text-base text-primary-gray">
                    Oops! This project has no live link — maybe it&apos;s
                    private or in progress.{" "}
                    <Link
                      href="/contact"
                      className="inline-flex items-center hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
                    >
                      <span>Contact me if you&apos;re interested</span>
                    </Link>
                    .
                  </p>
                )}
              </div>

              <span className="text-xs text-primary-gray mt-6 sm:mt-10 md:mt-0 md:text-right tracking-normal">
                Created: {formatDate(project.createdAt)}
              </span>
            </div>

            {!isLoading && (
              <>
                <hr className="border-t border-primary-gray/20 my-8 sm:my-12" />
                <OtherProjects
                  currentProjectSlug={project.slug}
                  isProjectDetailLoading={isLoading}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
