import { Project } from "../types/index";

export const fallbackProjects: Project[] = [
  {
    id: 101,
    title: "Aspect-Based Sentiment Analysis on DANA App",
    slug: "absa-dana",
    description:
      "Analisis Sentimen Berbasis Aspek Ulasan Pengguna Aplikasi DANA di Google Play Store Menggunakan IndoBERT dan Support Vector Machine",
    content: "/content/absa-dana/1.md",
    thumbnail: "",
    tags: [
      "Experiment",
      "NLP",
      "Python",
      "Machine Learning",
      "IndoBERT",
      "SVM",
      "ABSA",
    ],
    createdAt: "2026-08-15",
    sourceCode: "https://github.com/rianmubarok",
    isSeries: true,
    totalParts: 20,
    seriesManifestUrl: "/content/absa-dana/manifest.json",
  },
  {
    id: 102,
    title: "Plantix - Time Series & Change Point Detection",
    slug: "plantix",
    description:
      "Analisis Perubahan Karakteristik Ulasan Pengguna Aplikasi Plantix Menggunakan Metode Change Point Detection (PELT) dan Uji Mann-Whitney U",
    content: "/content/plantix/1.md",
    thumbnail: "",
    tags: [
      "Experiment",
      "Time Series",
      "Python",
      "Data Analysis",
      "PELT",
      "Statistics",
    ],
    createdAt: "2026-09-01",
    sourceCode: "https://github.com/rianmubarok",
    isSeries: true,
    totalParts: 19,
    seriesManifestUrl: "/content/plantix/manifest.json",
  },
];

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
