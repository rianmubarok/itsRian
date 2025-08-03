import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Proxy Provider Website",
    slug: "proxy-provider-website",
    description:
      "Proxy provider website including authentication, dashboard and dynamic features",
    detail:
      "A fully responsive proxy provider platform with user registration, authentication system, and dynamic dashboard for managing proxies. Built with modern tech stack and designed for scalability.",
    image:
      "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Bootstrap", "Styled Components"],
    createdAt: "2025-08-01",
    sourceCode: "https://github.com/yourname/proxy-provider",
    liveProject: "https://proxy-provider.vercel.app",
  },
  {
    id: 2,
    title: "MovieDB",
    slug: "moviedb",
    description:
      "TV application, displays different categories of movies alongside a search option using TheMovieDB API for the data",
    detail:
      "A movie web app that allows users to browse by genre, search for titles, and view detailed info about each movie using TheMovieDB API. Includes Redux for state management.",
    image:
      "https://images.unsplash.com/photo-1522743791393-522312deeebf?q=80&w=758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Redux", "TheMovieDB"],
    createdAt: "2025-07-20",
    sourceCode: "https://github.com/yourname/moviedb",
  },
  {
    id: 3,
    title: "Blockchain Explorer; Hive Attention Tokens",
    slug: "blockchain-explorer",
    description:
      "Sidechain explorer open source project (block explorer) for transactions",
    detail:
      "This open-source blockchain explorer provides detailed information on transactions, blocks, and tokens on the Hive Attention Token chain. Optimized for developer use.",
    image:
      "https://images.unsplash.com/photo-1512998844734-cd2cca565822?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Next.js", "React", "Tailwind CSS"],
    createdAt: "2025-06-15",
  },
  {
    id: 4,
    title: "GitProfile",
    slug: "gitprofile",
    description:
      "A nicer look to Github profiles using features such as user search, and charts using GitHub API",
    detail:
      "GitProfile enhances GitHub profiles with beautiful UI, user search functionality, and activity charts. Integrates with GitHub API and uses Firebase for storage.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Redux", "Firebase", "GithubAPI"],
    createdAt: "2025-05-10",
    liveProject: "https://gitprofile.vercel.app",
  },
];
