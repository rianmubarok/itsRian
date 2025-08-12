"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "../../../types";
import { getProjectBySlug } from "../../../data/projects";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { formatDate } from "../../../utils";
import OtherProjects from "../../../components/project/OtherProjects";
import ProjectContent from "@/components/project/ProjectContent";
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

  const { showContent, handleContentShow, refs } = useProjectAnimation();

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

  if (!isLoading && !project) {
    notFound();
  }

  return (
    <main
      className="relative max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48 min-h-screen text-primary-dark dark:text-primary-light"
      role="main"
    >
      <div
        className={`absolute inset-0 w-full min-h-full z-10 bg-white/80 dark:bg-primary-dark/80 transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-white/50 rounded w-1/4 mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-white/50 rounded w-3/4 mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-white/50 rounded w-1/2 mb-12"></div>
          <div className="h-80 bg-gray-200 dark:bg-white/50 rounded-xl mb-12"></div>
        </div>
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
              className="group text-base sm:text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 mb-6 sm:mb-8"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
              Back to projects
            </Link>

            <div ref={refs.headerRef} className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight mb-4 sm:mb-6">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-primary-gray mb-4 sm:mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div ref={refs.imageRef} className="mb-8 sm:mb-12">
              <div className="relative h-60 sm:h-80 md:h-180 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              ref={refs.tagsRef}
              className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-regular">Tech Stack :</h2>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-4 py-1 text-xs sm:text-sm font-light rounded-full border border-primary-dark dark:border-primary-light flex items-center"
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
              className="mt-20 sm:mt-24 md:mt-32 mb-12 sm:mb-16 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 sm:gap-2 w-full"
            >
              <div className="text-base sm:text-lg text-primary-dark dark:text-primary-light font-light flex flex-wrap items-center gap-4 sm:gap-8">
                {project.sourceCode && (
                  <Link
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 sm:gap-3 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
                    <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                      Source Code
                    </span>
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
                    className="group flex items-center gap-2 sm:gap-3 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
                    <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                      Live Project
                    </span>
                  </Link>
                )}

                {!project.sourceCode && !project.liveProject && (
                  <p className="text-sm sm:text-base text-primary-gray">
                    Oops! This project has no live link — maybe it&apos;s
                    private or in progress.{" "}
                    <Link
                      href="/contact"
                      className="group inline-flex items-center transition-all duration-300"
                    >
                      <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                        Contact me if you&apos;re interested
                      </span>
                    </Link>
                    .
                  </p>
                )}
              </div>

              <span className="text-sm sm:text-base text-primary-gray mt-6 sm:mt-10 md:mt-0 md:text-right">
                Created: {formatDate(project.createdAt)}
              </span>
            </div>

            <hr className="border-t border-primary-gray/20 my-8 sm:my-12" />

            <OtherProjects currentProjectSlug={project.slug} />
          </>
        )}
      </div>
    </main>
  );
}
