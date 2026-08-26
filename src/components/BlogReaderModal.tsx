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

  // Reset scroll progress when modal opens
  useEffect(() => {
    if (isOpen) {
      setScrollProgress(0);
    }
  }, [isOpen, post]);

  // Handle scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const totalScrollable = scrollHeight - clientHeight;
    if (totalScrollable > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100));
      setScrollProgress(progress);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 dark:bg-slate-950/85 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] dark:bg-slate-900/95 bg-[#fbf8f3] dark:border-slate-700/80 border-stone-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden dark:text-slate-100 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Reading Progress Bar - Highly visible with solid color + gradient + glow */}
        <div
          className="absolute top-0 left-0 h-1 bg-[#d97757] bg-gradient-to-r from-[#c15f3e] via-[#d97757] to-[#e08a6b] dark:bg-cyan-400 dark:from-cyan-400 dark:via-emerald-400 dark:to-cyan-300 z-50 transition-all duration-100 shadow-[0_1px_8px_rgba(217,119,87,0.4)] dark:shadow-[0_1px_8px_rgba(6,182,212,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b dark:border-slate-800 border-stone-200 dark:bg-slate-950/80 bg-stone-100/90 shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:bg-slate-900 bg-white dark:hover:bg-slate-800 hover:bg-stone-50 border dark:border-slate-800 border-stone-300 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono-code dark:bg-cyan-500/10 bg-claude-500/10 text-claude-700 dark:text-cyan-300 border dark:border-cyan-500/20 border-claude-500/30 font-medium">
              {post.category}
            </span>
          </div>

          {/* Reading progress percentage pill */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono-code dark:text-cyan-400 text-claude-700 font-semibold px-2 py-0.5 rounded-md dark:bg-cyan-500/10 bg-claude-500/10 border dark:border-cyan-500/20 border-claude-500/30">
              {Math.round(scrollProgress)}% read
            </span>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code dark:text-slate-300 text-stone-700 dark:bg-slate-900 bg-white dark:hover:bg-slate-800 hover:bg-stone-50 border dark:border-slate-800 border-stone-300 transition-colors shadow-sm"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="p-2 rounded-lg dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:bg-slate-900 bg-white dark:hover:bg-slate-800 hover:bg-stone-50 border dark:border-slate-800 border-stone-300 transition-colors shadow-sm"
              title="Open full page in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="p-2 rounded-lg dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:bg-slate-900 bg-white dark:hover:bg-slate-800 hover:bg-stone-50 border dark:border-slate-800 border-stone-300 transition-colors shadow-sm"
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
          <div className="space-y-4 border-b dark:border-slate-800/80 border-stone-200 pb-6 text-left">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code dark:text-slate-400 text-stone-500">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-claude-600 dark:text-cyan-400" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{post.readTime}</span>
              </span>
              <span>•</span>
              <span className="dark:text-slate-300 text-stone-700 font-medium">By {post.author}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono-code dark:text-white text-stone-900 leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg dark:text-slate-300 text-stone-700 leading-relaxed font-sans">
              {post.excerpt}
            </p>

            {/* Author card strip */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full dark:bg-slate-800 bg-stone-200 border dark:border-cyan-500/30 border-claude-500/40 flex items-center justify-center text-claude-700 dark:text-cyan-400 font-mono-code font-bold text-sm">
                  NK
                </div>
                <div>
                  <p className="text-sm font-semibold dark:text-white text-stone-900 font-mono-code">
                    {post.author}
                  </p>
                  <p className="text-xs dark:text-slate-400 text-stone-500 font-mono-code">
                    {post.role}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono-code dark:text-slate-300 text-stone-700 dark:bg-slate-800/80 bg-stone-200 border dark:border-slate-700/60 border-stone-300"
                  >
                    <Tag className="w-2.5 h-2.5 text-claude-500 dark:text-cyan-400" />
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
          <div className="pt-8 border-t dark:border-slate-800 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono-code dark:text-slate-400 text-stone-500 text-center sm:text-left">
              Published in <span className="text-claude-700 dark:text-cyan-400 font-medium">{post.category}</span> by {post.author}
            </div>

            <button
              onClick={() => {
                const container = document.querySelector(".article-body");
                container?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-lg text-xs font-mono-code dark:bg-slate-800 bg-stone-200 hover:bg-stone-300 dark:hover:bg-slate-700 dark:text-slate-300 text-stone-700 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
