import { Project } from "../types/index";

export const fallbackProjects: Project[] = [];

export async function getProjectsFromAPI(): Promise<Project[]> {
  try {
    const response = await fetch("/api/projects");

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }

    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects from API:", error);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${slug}`);

    if (!response.ok) {
      return null;
    }

    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return fallbackProjects.find((project) => project.slug === slug) || null;
  }
}
