export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverIcon: string;
  gradient?: string;
  content: string;
}
