export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  type: string;
  location: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    period: "Oct 2023 - Present",
    title: "Icon Designer",
    company: "Mangun Creative",
    type: "Part-time",
    location: "Remote",
    description:
      "Started my creative journey in the world of design, focusing on consistent and scalable icon systems. This experience sharpened my visual precision and built a strong foundation for crafting functional and intuitive UI/UX as a developer.",
  },
  {
    id: "2",
    period: "Jan 2023 - Sep 2023",
    title: "Frontend Developer Intern",
    company: "TechStart Solutions",
    type: "Internship",
    location: "Jakarta",
    description:
      "Worked on developing responsive web applications using React and TypeScript. Collaborated with senior developers to implement new features and improve user experience. Gained hands-on experience with modern frontend development practices and tools.",
  },
  {
    id: "3",
    period: "Jun 2022 - Dec 2022",
    title: "UI/UX Design Freelancer",
    company: "Freelance",
    type: "Contract",
    location: "Remote",
    description:
      "Designed user interfaces and user experiences for various clients across different industries. Created wireframes, prototypes, and high-fidelity designs using Figma and Adobe Creative Suite. Focused on creating intuitive and accessible designs.",
  },
  {
    id: "4",
    period: "Mar 2022 - May 2022",
    title: "Web Development Trainee",
    company: "Digital Academy",
    type: "Training",
    location: "Bandung",
    description:
      "Participated in an intensive web development bootcamp where I learned HTML, CSS, JavaScript, and basic backend concepts. Completed several projects including a portfolio website and a simple e-commerce application.",
  },
];
