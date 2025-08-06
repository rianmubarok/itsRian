"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../../../data";
import { notFound } from "next/navigation";
import { use } from "react";
import { formatDate } from "../../../utils";
import OtherProjects from "../../../components/project/OtherProjects";
import { useIntersectionObserver } from "../../../hooks";

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

  const { ref: backButtonRef, isIntersecting: backButtonIntersecting } =
    useIntersectionObserver<HTMLAnchorElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: headerRef, isIntersecting: headerIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: imageRef, isIntersecting: imageIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: tagsRef, isIntersecting: tagsIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: contentRef, isIntersecting: contentIntersecting } =
    useIntersectionObserver<HTMLParagraphElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: linksRef, isIntersecting: linksIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto mt-48"
      role="main"
    >
      {/* Back Button */}
      <Link
        ref={backButtonRef}
        href="/projects"
        className={`group text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 mb-8 transition-all duration-300 ${
          backButtonIntersecting
            ? "translate-x-0 opacity-100"
            : "-translate-x-4 opacity-0"
        }`}
      >
        <ArrowLeft className="w-6 h-6 stroke-1" />
        Back to projects
      </Link>

      {/* Project Header */}
      <div
        ref={headerRef}
        className={`mb-12 transition-all duration-700 ease-out delay-200 ${
          headerIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <h1 className="text-5xl font-medium leading-tight tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-primary-gray mb-6 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Project Image */}
      <div
        ref={imageRef}
        className={`mb-12 transition-all duration-700 ease-out delay-400 ${
          imageIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="relative h-80 md:h-180 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Tags */}
      <div
        ref={tagsRef}
        className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 ease-out delay-600 ${
          tagsIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-regular">Tech Stack :</h2>
        {project.tags.map((tag, index) => (
          <span
            key={tag}
            className="px-4 py-1 text-sm font-light rounded-full border border-primary-dark dark:border-primary-light flex items-center transition-all duration-700 ease-out"
            style={{
              transitionDelay: `${800 + index * 100}ms`,
              transform: tagsIntersecting
                ? "translateY(0) scale(1)"
                : "translateY(10px) scale(0.95)",
              opacity: tagsIntersecting ? 1 : 0,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <p
        ref={contentRef}
        className={`text-lg leading-relaxed text-primary-gray transition-all duration-700 ease-out delay-800 ${
          contentIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {project.detail}
      </p>

      <div
        ref={linksRef}
        className={`mt-32 mb-16 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-2 w-full transition-all duration-700 ease-out delay-1000 ${
          linksIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <div className="text-lg text-primary-dark dark:text-primary-light font-light flex flex-wrap items-center gap-8">
          {project.sourceCode && (
            <Link
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-all duration-300"
            >
              <Github className="w-6 h-6 stroke-1" />
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
              className="group flex items-center gap-3 transition-all duration-300"
            >
              <ExternalLink className="w-6 h-6 stroke-1" />
              <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                Live Project
              </span>
            </Link>
          )}

          {!project.sourceCode && !project.liveProject && (
            <p className="text-base text-primary-gray">
              Oops! This project has no live link — maybe it's private or in
              progress.{" "}
              <Link
                href="/contact"
                className="group inline-flex items-center transition-all duration-300"
              >
                <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                  Contact me if you're interested
                </span>
              </Link>
              .
            </p>
          )}
        </div>

        <span className="text-base text-primary-gray mt-10 md:mt-0 md:text-right">
          Created: {formatDate(project.createdAt)}
        </span>
      </div>

      <hr className="border-t border-primary-gray/20 my-12" />

      {/* Other Projects Section */}
      <OtherProjects currentProjectSlug={project.slug} />
    </main>
  );
}
