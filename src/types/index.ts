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
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
  featured?: boolean;
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

export interface Theme {
  light: "light";
  dark: "dark";
  system: "system";
}
