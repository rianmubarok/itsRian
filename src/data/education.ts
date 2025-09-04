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
      "Currently pursuing a degree in Computer Science with a focus on programming, software development, and problem-solving. Actively involved in academic projects including web and mobile application development, learning new frameworks, and applying algorithms and data structures in practical scenarios.",
  },
];
