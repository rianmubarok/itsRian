import { NavItem } from "../types";

export const siteConfig = {
  name: "itsRian",
  description: "Personal Portfolio",
  url: "https://itsrian.com",
  ogImage: "https://itsrian.com/og.jpg",
  links: {
    github: "https://github.com/itsrian",
    linkedin: "https://linkedin.com/in/itsrian",
    email: "rian@example.com",
  },
  location: {
    city: "Jepara",
    country: "Indonesia",
  },
  social: {
    twitter: "https://twitter.com/itsrian",
    instagram: "https://instagram.com/itsrian",
  },
} as const;

export const SITE_NAME = siteConfig.name;
export const SITE_DESCRIPTION = siteConfig.description;
export const SITE_URL = siteConfig.url;

export const SOCIAL_LINKS = {
  github: siteConfig.links.github,
  twitter: siteConfig.social.twitter,
  linkedin: siteConfig.links.linkedin,
  instagram: siteConfig.social.instagram,
  email: siteConfig.links.email,
} as const;

export const NAVIGATION = {
  home: "/",
  projects: "/projects",
  blog: "/blog",
  about: "/aboutme",
  contact: "/contact",
  guestbook: "/guestbook",
} as const;

export const THEME = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;

export const navItems: NavItem[] = [
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/aboutme" },
  { name: "Guestbook", href: "/guestbook" },
  { name: "Contact", href: "/contact" },
];
