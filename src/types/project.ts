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
