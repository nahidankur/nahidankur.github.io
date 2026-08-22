"use client";

import React, { useState } from "react";
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

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(initialPosts.flatMap((p) => p.tags)))];

  const filteredPosts =
    selectedTag === "All"
      ? initialPosts
      : initialPosts.filter((p) => p.tags.includes(selectedTag));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Server":
        return <Server className="w-5 h-5 text-cyan-400" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-indigo-400" />;
      default:
        return <FileText className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="blog" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono-code text-cyan-300 uppercase tracking-wider">
              Engineering Notes &amp; Articles
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-mono-code text-white">
            Architecture Writeups &amp; Tech Insights
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Technical deep dives on backend system design, high-concurrency Node.js optimization,
            PostgreSQL tuning, and zero-downtime DevOps pipelines.
          </p>

          {/* Tag Filter Bar */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all duration-200 ${
                    selectedTag === tag
                      ? "bg-cyan-500 text-black font-semibold shadow-glow-cyan"
                      : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative rounded-2xl border border-slate-800/90 bg-slate-950/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-glow-cyan transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setSelectedPost(post)}
            >
              {/* Subtle top gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  post.slug.includes("nodejs")
                    ? "from-cyan-400 via-emerald-400 to-cyan-300"
                    : "from-indigo-400 via-cyan-400 to-emerald-400"
                } opacity-80 group-hover:opacity-100 transition-opacity`}
              />

              <div className="space-y-4">
                {/* Meta Top: Icon + Category + Read Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {getIcon(post.coverIcon)}
                    </div>
                    <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-300 font-medium">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono-code text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-mono-code text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono-code text-slate-400 bg-slate-900/90 border border-slate-800"
                    >
                      <Tag className="w-2.5 h-2.5 text-cyan-400/80" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-6 border-t border-slate-900 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono-code text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.date}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(post);
                  }}
                  className="inline-flex items-center space-x-2 text-xs font-mono-code font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
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
