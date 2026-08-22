import React from "react";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import { getAllBlogPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllBlogPosts();

  return <HomeClientWrapper posts={posts} />;
}
