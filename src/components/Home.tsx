"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../lib/projects";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto mt-24 mb-48" role="main">
      {/* Intro Section */}
      <section className="flex gap-4 w-full mb-24">
        <article className="basis-2/3 text-primary-dark dark:text-primary-light">
          <header className="flex items-center gap-4 mb-6">
            <figure className="w-[60px] h-[60px] rounded-full overflow-hidden">
              <Image
                src="/rian.jpg"
                alt="Rian - Visual Designer and Developer"
                width={60}
                height={60}
                className="w-full object-cover"
                priority
              />
            </figure>
            <p className="text-[32px]">Hey there, I'm Rian 👋</p>
          </header>
          <h1 className="text-6xl font-medium leading-snug tracking-tight">
            a visual designer exploring the intersection of design and
            development
          </h1>
        </article>

        <aside className="basis-1/3 flex items-end justify-end">
          <address className="text-right not-italic">
            <p className="text-base text-primary-gray">Based in</p>
            <p className="text-lg text-primary-dark dark:text-primary-light">
              Jepara, Indonesia
            </p>
          </address>
        </aside>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-medium text-primary-dark dark:text-primary-light">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-lg text-primary-gray hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
          >
            View All Projects
          </Link>
        </div>

        {/* Scrollable Projects Container */}
        <div className="relative">
          <div
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-pointer active:cursor-grabbing"
            onMouseDown={(e) => {
              const container = e.currentTarget;
              const startX = e.pageX - container.offsetLeft;
              const scrollLeft = container.scrollLeft;

              const onMouseMove = (eMove: MouseEvent) => {
                const x = eMove.pageX - container.offsetLeft;
                const walk = (x - startX) * 1;
                container.scrollLeft = scrollLeft - walk;
              };

              const onMouseUp = () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
              };

              window.addEventListener("mousemove", onMouseMove);
              window.addEventListener("mouseup", onMouseUp);
            }}
          >
            {featuredProjects.map((project) => (
              <div key={project.id} className="flex-shrink-0 w-[450px] group">
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative h-[300px] bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-xl">
                    {/* Project Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content Container - positioned at bottom with flex layout */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-20">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-1 text-sm font-light rounded-full border border-white/30 bg-white/20 backdrop-blur-sm text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & Icon */}
                      <div className="flex items-start justify-between">
                        <h3 className="text-white text-2xl font-regular flex-1">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="text-white w-10 h-10 stroke-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
