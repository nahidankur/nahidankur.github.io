import React from "react";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import NotesClientPage from "@/components/NotesClientPage";

export const metadata: Metadata = {
  title: "Engineering Notes | Nahid Karim Ankur",
  description:
    "Technical notes, architecture deep dives, Node.js optimization, Docker Swarm infrastructure, and database tuning by Nahid Karim Ankur.",
  keywords: [
    "Software Engineering",
    "System Architecture",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "Docker Swarm",
    "Microservices",
    "DevOps",
  ],
};

export default function NotesPage() {
  const posts = getAllBlogPosts();

  return <NotesClientPage initialPosts={posts} />;
}
