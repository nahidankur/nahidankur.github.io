import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Nahid Karim Ankur",
    };
  }

  return {
    title: `${post.title} | Nahid Karim Ankur`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-background text-slate-100 cyber-grid">
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-cyan" />
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-violet" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Back to Blog Navigation */}
            <div className="mb-8">
              <Link
                href="/#blog"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-mono-code text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-850 border border-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio &amp; Articles</span>
              </Link>
            </div>

            {/* Article Container Card */}
            <article className="rounded-2xl border border-slate-800 bg-slate-950/70 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
              {/* Header Meta */}
              <div className="space-y-4 border-b border-slate-800/80 pb-8 text-left">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-slate-400">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono-code text-white leading-tight">
                  {post.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                  {post.excerpt}
                </p>

                {/* Author Details Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-11 w-11 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono-code font-bold text-sm">
                      NK
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white font-mono-code">
                        {post.author}
                      </p>
                      <p className="text-xs text-slate-400 font-mono-code">
                        {post.role}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono-code text-slate-400 bg-slate-900 border border-slate-800"
                      >
                        <Tag className="w-2.5 h-2.5 text-cyan-400/80" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rendered Markdown Article */}
              <div className="py-8">
                <MarkdownRenderer content={post.content} />
              </div>

              {/* Bottom Footer */}
              <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-mono-code font-semibold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-glow-cyan transition-all"
                >
                  <span>Discuss This Architecture With Me</span>
                </Link>

                <Link
                  href="/#blog"
                  className="text-xs font-mono-code text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  ← Explore More Technical Writeups
                </Link>
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
