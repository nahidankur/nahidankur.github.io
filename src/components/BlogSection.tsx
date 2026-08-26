"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Server,
  Boxes,
  FileText,
  Tag,
  Sparkles,
} from "lucide-react";
import { BlogPost } from "@/types/blog";
import BlogReaderModal from "./BlogReaderModal";

interface BlogSectionProps {
  initialPosts?: BlogPost[];
}

export default function BlogSection({ initialPosts = [] }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract unique tags from all posts
  const allTags = ["All", ...Array.from(new Set(initialPosts.flatMap((p) => p.tags)))];

  const filteredPosts =
    selectedTag === "All"
      ? initialPosts
      : initialPosts.filter((p) => p.tags.includes(selectedTag));

  // Home section shows top 4 featured posts
  const displayedPosts = filteredPosts.slice(0, 4);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="w-5 h-5 text-claude-600 dark:text-cyan-400" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <FileText className="w-5 h-5 text-claude-700 dark:text-emerald-400" />;
    }
  };

  return (
    <section id="notes" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Invisible anchor for backward compatibility */}
      <span id="blog" className="absolute -top-24 pointer-events-none" />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] dark:bg-cyan-500/5 bg-[#d97757]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] dark:bg-emerald-500/5 bg-[#cc785c]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full dark:bg-slate-900/80 bg-white/90 border dark:border-slate-800 border-stone-200 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-claude-600 dark:text-cyan-400" />
            <span className="text-xs font-mono-code text-claude-700 dark:text-cyan-300 uppercase tracking-wider font-semibold">
              Engineering Notes &amp; Articles
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-mono-code dark:text-white text-stone-900">
            Architecture Writeups &amp; Tech Insights
          </h2>

          <p className="dark:text-slate-400 text-stone-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Technical deep dives on backend system design, high-concurrency Node.js optimization,
            PostgreSQL tuning, and zero-downtime DevOps pipelines.
          </p>

          {/* Tag Filter Bar */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all duration-200 ${
                    selectedTag === tag
                      ? "dark:bg-cyan-500 dark:text-black dark:border-cyan-500 bg-[#d97757] text-white font-semibold shadow-sm border border-[#d97757]"
                      : "dark:bg-slate-900/80 bg-white/90 dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white border dark:border-slate-800 border-stone-300 dark:hover:border-slate-700 hover:border-claude-500/40 shadow-sm"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Blog Cards Grid (Max 4 on Homepage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {displayedPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative rounded-2xl border dark:border-slate-800/90 border-stone-200/90 dark:bg-slate-950/60 bg-white/85 p-6 sm:p-8 flex flex-col justify-between hover:border-claude-500/40 dark:hover:border-cyan-500/40 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
              onClick={() => setSelectedPost(post)}
            >
              {/* Top Accent Gradient Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-[#d97757] bg-gradient-to-r ${
                  post.slug.includes("nodejs")
                    ? "from-[#c15f3e] via-[#d97757] to-[#e08a6b] dark:from-cyan-400 dark:via-emerald-400 dark:to-cyan-300"
                    : "from-[#9c492e] via-[#c15f3e] to-[#d97757] dark:from-indigo-400 dark:via-cyan-400 dark:to-emerald-400"
                } opacity-90 group-hover:opacity-100 transition-opacity`}
              />

              <div className="space-y-4">
                {/* Meta Top: Icon + Category + Read Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl dark:bg-slate-900 bg-stone-100 border dark:border-slate-800 border-stone-200 group-hover:border-claude-500/30 dark:group-hover:border-cyan-500/30 transition-colors">
                      {getIcon(post.coverIcon)}
                    </div>
                    <span className="text-xs font-mono-code px-2.5 py-1 rounded-full dark:bg-slate-900 bg-claude-500/10 border dark:border-slate-800 border-claude-500/30 text-claude-700 dark:text-cyan-300 font-medium">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono-code dark:text-slate-500 text-stone-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-claude-600 dark:text-emerald-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-mono-code dark:text-white text-stone-900 group-hover:text-claude-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm dark:text-slate-400 text-stone-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono-code dark:text-slate-400 text-stone-600 dark:bg-slate-900/90 bg-stone-100 border dark:border-slate-800 border-stone-200"
                    >
                      <Tag className="w-2.5 h-2.5 text-claude-500 dark:text-cyan-400/80" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-6 border-t dark:border-slate-900 border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono-code dark:text-slate-500 text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 dark:text-slate-400" />
                  <span>{post.date}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-mono-code font-semibold text-claude-700 dark:text-cyan-400 hover:text-claude-800 dark:hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Prominent "See More Notes" CTA to Dedicated Page */}
        <div className="text-center pt-4">
          <Link
            href="/notes"
            className="btn-primary inline-flex items-center space-x-2.5 px-6 py-3 rounded-xl font-mono-code text-sm font-semibold shadow-md group hover:scale-[1.02] transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore All Engineering Notes ({initialPosts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Reader Modal */}
      <BlogReaderModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  );
}
