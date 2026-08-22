import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load blog posts" },
      { status: 500 }
    );
  }
}
