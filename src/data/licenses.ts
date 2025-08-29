export interface License {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  link?: string;
}

export const licenses: License[] = [
  {
    id: "1",
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2024",
    description:
      "Certified React developer with expertise in modern React patterns, hooks, and best practices. Completed comprehensive training on React ecosystem and development tools.",
    link: "https://www.meta.com/careers/developers/",
  },
  {
    id: "2",
    name: "TypeScript Fundamentals",
    issuer: "Microsoft",
    date: "2023",
    description:
      "Completed TypeScript fundamentals course covering type system, interfaces, generics, and advanced TypeScript features for robust application development.",
    link: "https://www.typescriptlang.org/",
  },
  {
    id: "3",
    name: "UI/UX Design Principles",
    issuer: "Google",
    date: "2023",
    description:
      "Certified in UI/UX design principles including user research, wireframing, prototyping, and usability testing for creating user-centered digital products.",
    link: "https://design.google/",
  },
];
