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
    period: "2020 - 2024",
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    location: "Jakarta",
    description: "Studied computer science with focus on software engineering, algorithms, and data structures. Completed final year project on web application development using modern technologies.",
  },
  {
    id: "2",
    period: "2018 - 2020",
    degree: "High School Diploma",
    institution: "Science High School",
    location: "Bandung",
    description: "Completed high school with focus on mathematics and natural sciences. Participated in various academic competitions and coding clubs.",
  },
]; 