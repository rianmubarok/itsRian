export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  createdAt: string;
  detail: string;
  sourceCode?: string;
  liveProject?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  url: string;
  featured?: boolean;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  content: {
    en: string;
    id: string;
  };
  thumbnail: string;
  createdAt: string;
  viewCount: string;
  readingTime: string;
  blocks?: unknown[];
}

export interface Theme {
  light: "light";
  dark: "dark";
  system: "system";
}
