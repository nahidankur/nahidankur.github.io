import fs from "fs";
import path from "path";
import { BlogPost } from "@/types/blog";

export type { BlogPost };

const BLOGS_DIRECTORY = path.join(process.cwd(), "content", "blogs");

/**
 * Parses frontmatter from markdown file contents.
 */
export function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent.trim());

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterBlock = match[1];
  const content = match[2];

  const data: Record<string, any> = {};
  const lines = frontmatterBlock.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();

    // Handle string quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle array format: ["a", "b"]
    if (value.startsWith("[") && value.endsWith("]")) {
      const arrayContent = value.slice(1, -1);
      data[key] = arrayContent
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }

  return { data, content };
}

/**
 * Retrieves all blog posts sorted by date descending.
 */
export function getAllBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOGS_DIRECTORY)) {
      return [];
    }

    const fileNames = fs.readdirSync(BLOGS_DIRECTORY);
    const allPosts = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const fullPath = path.join(BLOGS_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = parseFrontmatter(fileContents);

        const slug = data.slug || fileName.replace(/\.md$/, "");

        return {
          slug,
          title: data.title || "Untitled Article",
          excerpt: data.excerpt || "",
          author: data.author || "Nahid Karim Ankur",
          role: data.role || "Software Engineer",
          date: data.date || "2026-02-01",
          readTime: data.readTime || "5 min read",
          category: data.category || "Engineering",
          tags: Array.isArray(data.tags) ? data.tags : ["Engineering"],
          coverIcon: data.coverIcon || "FileText",
          gradient: data.gradient || "from-cyan-500/20 via-slate-800 to-transparent",
          content,
        } as BlogPost;
      });

    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

/**
 * Retrieves a single blog post by its slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}
