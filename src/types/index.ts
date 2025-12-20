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
  thumbnail: string;
  ogImage?: string;
  tags: string[];
  createdAt: string;
  content: string;
  sourceCode?: string;
  liveProject?: string;
  resources1?: string[];
  resources2?: string[];
  lottie?: string;
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
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  content: {
    en: string;
    id: string;
  };
  thumbnail: string;
  ogImage?: string;
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
