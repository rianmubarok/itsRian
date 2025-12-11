import { NavItem } from "../types";

export const siteConfig = {
  name: "Muhammad Fitrian Mubarok",
  description: "Personal Portfolio",
  url: "https://itsrian.my.id",
  ogImage: "/og/og-image.png",
  links: {
    github: "https://github.com/rianmubarok",
    linkedin: "https://www.linkedin.com/in/rianmubarok/",
    email: "muhammadfitrianmubarok@gmail.com",
  },
  location: {
    city: "Jepara",
    country: "Indonesia",
  },
  social: {
    twitter: "https://twitter.com/mub92253",
    instagram: "https://instagram.com/m.fitrianm_",
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
