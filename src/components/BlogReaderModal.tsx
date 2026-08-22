"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  X,
  Clock,
  Calendar,
  Share2,
  Check,
  ExternalLink,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { BlogPost } from "@/types/blog";
import { copyToClipboard } from "@/lib/utils";
import MarkdownRenderer from "./MarkdownRenderer";

interface BlogReaderModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogReaderModal({
  post,
  isOpen,
  onClose,
}: BlogReaderModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };

  if (!isOpen || !post) return null;

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading Progress Bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 z-30 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </button>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono-code bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {post.category}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-8 scroll-smooth"
        >
          {/* Article Header Meta */}
          <div className="space-y-4 border-b border-slate-800/80 pb-6 text-left">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{post.readTime}</span>
              </span>
              <span>•</span>
              <span className="text-slate-300 font-medium">By {post.author}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono-code text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {post.excerpt}
            </p>

            {/* Author card strip */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono-code font-bold text-sm">
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
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono-code text-slate-300 bg-slate-800/80 border border-slate-700/60"
                  >
                    <Tag className="w-2.5 h-2.5 text-cyan-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rendered Markdown Body */}
          <div className="article-body">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Footer of Article */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono-code text-slate-400 text-center sm:text-left">
              Published in <span className="text-cyan-400">{post.category}</span> by {post.author}
            </div>

            <button
              onClick={() => {
                const container = document.querySelector(".article-body");
                container?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-lg text-xs font-mono-code bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
