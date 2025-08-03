import { projects } from "../../lib/projects";
import ProjectCard from "../../components/project/ProjectCard";

export default function ProjectsPage() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      <h1 className="text-6xl font-medium leading-snug tracking-tight mb-6">
        All Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="grid" />
        ))}
      </div>
    </main>
  );
}
