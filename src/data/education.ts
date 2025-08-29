export interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
}

export const education: Education[] = [
  {
    id: "1",
    period: "2023 - present",
    degree: "Bachelor of Computer Science",
    institution: "Universitas Islam Nahdlatul Ulama Jepara",
    location: "Jepara",
    description:
      "Currently pursuing a degree in Computer Science with focus on programming, software development, and UI/UX design. Balancing academic studies with professional work as an icon designer and personal projects in web development and motion graphics.",
  },
];
