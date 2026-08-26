"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Server,
  Boxes,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { BlogPost } from "@/types/blog";
import BlogReaderModal from "./BlogReaderModal";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface NotesClientPageProps {
  initialPosts: BlogPost[];
}

const ITEMS_PER_PAGE = 6;

export default function NotesClientPage({ initialPosts }: NotesClientPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Extract all categories
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(initialPosts.map((p) => p.category)))];
  }, [initialPosts]);

  // Extract all tags
  const tags = useMemo(() => {
    return ["All", ...Array.from(new Set(initialPosts.flatMap((p) => p.tags)))];
  }, [initialPosts]);

  // Filter posts based on search query, category, and tag
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialPosts.filter((post) => {
      // Category match
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      // Tag match
      const matchesTag =
        selectedTag === "All" || post.tags.includes(selectedTag);

      // Search match (title, excerpt, content, tags, category, author)
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.content.toLowerCase().includes(query);

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [initialPosts, searchQuery, selectedCategory, selectedTag]);

  // Reset page to 1 when filters change
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag("All");
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

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
    <div className="min-h-screen bg-background text-foreground flex flex-col cyber-grid relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] dark:bg-cyan-500/10 bg-[#d97757]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-[450px] h-[350px] dark:bg-emerald-500/8 bg-[#cc785c]/8 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8">
          {/* Breadcrumb & Page Header */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-xs font-mono-code dark:text-slate-400 text-stone-500">
              <Link
                href="/"
                className="hover:text-claude-700 dark:hover:text-cyan-400 flex items-center space-x-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="dark:text-cyan-300 text-claude-700 font-semibold">
                Engineering Notes
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b dark:border-slate-800 border-stone-200 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full dark:bg-slate-900/80 bg-white/90 border dark:border-slate-800 border-stone-200 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-claude-600 dark:text-cyan-400" />
                  <span className="text-xs font-mono-code text-claude-700 dark:text-cyan-300 uppercase tracking-wider font-semibold">
                    Knowledge Base &amp; Technical Articles
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono-code dark:text-white text-stone-900 tracking-tight">
                  Engineering Notes
                </h1>
                <p className="dark:text-slate-400 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
                  Deep dives on backend architecture, Node.js high-concurrency systems,
                  PostgreSQL optimization, Docker Swarm infrastructure, and developer tooling.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono-code dark:text-slate-400 text-stone-500 shrink-0">
                <Sparkles className="w-4 h-4 text-claude-600 dark:text-cyan-400" />
                <span>{initialPosts.length} Published Notes</span>
              </div>
            </div>
          </div>

          {/* Search Bar & Filters Section */}
          <div className="space-y-4">
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search notes by title, keyword, technology, or content..."
                className="w-full pl-11 pr-10 py-3 rounded-xl dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-stone-300 text-sm font-sans dark:text-white text-stone-900 placeholder:text-stone-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-claude-500 dark:focus:border-cyan-500 transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:text-slate-500 dark:hover:text-slate-300"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono-code dark:text-slate-500 text-stone-500 flex items-center space-x-1 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Category:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all duration-200 ${
                    selectedCategory === cat
                      ? "dark:bg-cyan-500/20 bg-claude-500/15 dark:text-cyan-300 text-claude-700 border dark:border-cyan-500/40 border-claude-500/40 shadow-sm font-semibold"
                      : "dark:bg-slate-900/60 bg-white/80 dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-slate-200 border dark:border-slate-800 border-stone-300 dark:hover:bg-slate-850 hover:bg-stone-100 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tags Bar */}
            {tags.length > 2 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono-code dark:text-slate-500 text-stone-500 mr-1">
                  Tags:
                </span>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono-code transition-all duration-200 ${
                      selectedTag === tag
                        ? "dark:bg-cyan-400 dark:text-black dark:border-cyan-400 bg-[#d97757] text-white font-semibold shadow-sm border border-[#d97757]"
                        : "dark:bg-slate-950/80 bg-white dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-slate-200 border dark:border-slate-800 border-stone-300 shadow-sm"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Active Filters Summary */}
            {(searchQuery || selectedCategory !== "All" || selectedTag !== "All") && (
              <div className="flex items-center justify-between pt-2 text-xs font-mono-code dark:text-slate-400 text-stone-600">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span>Showing {filteredPosts.length} of {initialPosts.length} notes</span>
                  {searchQuery && (
                    <span className="px-2 py-0.5 rounded dark:bg-slate-800 bg-stone-200 text-stone-800 dark:text-slate-300 border dark:border-slate-700 border-stone-300">
                      Query: &ldquo;{searchQuery}&rdquo;
                    </span>
                  )}
                  {selectedCategory !== "All" && (
                    <span className="px-2 py-0.5 rounded dark:bg-slate-800 bg-stone-200 text-stone-800 dark:text-slate-300 border dark:border-slate-700 border-stone-300">
                      Category: {selectedCategory}
                    </span>
                  )}
                  {selectedTag !== "All" && (
                    <span className="px-2 py-0.5 rounded dark:bg-cyan-500/15 bg-[#d97757]/15 dark:text-cyan-300 text-[#c15f3e] border dark:border-cyan-500/30 border-[#d97757]/40 font-semibold">
                      Tag: #{selectedTag}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleResetFilters}
                  className="text-claude-700 dark:text-cyan-400 hover:underline flex items-center space-x-1 shrink-0 ml-2"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Notes Grid */}
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl dark:bg-slate-950/60 bg-white/80 border dark:border-slate-800 border-stone-200 space-y-4">
              <div className="inline-flex p-3 rounded-full dark:bg-slate-900 bg-stone-100 text-stone-400 dark:text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-mono-code dark:text-white text-stone-900">
                No matching engineering notes found
              </h3>
              <p className="text-xs sm:text-sm dark:text-slate-400 text-stone-600 max-w-md mx-auto">
                No articles matched your filter criteria. Try adjusting your search query or clear all filters to see all writeups.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono-code font-semibold"
              >
                <span>Clear All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {paginatedPosts.map((post) => (
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
                          <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold font-mono-code dark:text-white text-stone-900 group-hover:text-claude-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm dark:text-slate-400 text-stone-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagChange(tag);
                          }}
                          className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono-code dark:text-slate-400 text-stone-600 dark:bg-slate-900/90 bg-stone-100 border dark:border-slate-800 border-stone-200 hover:border-claude-500/40 hover:text-claude-700 dark:hover:text-cyan-300 transition-colors"
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
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-6 border-t dark:border-slate-800 border-stone-200">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg dark:bg-slate-900 bg-white border dark:border-slate-800 border-stone-300 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-lg text-xs font-mono-code font-semibold transition-all ${
                    currentPage === pageNum
                      ? "btn-primary shadow-sm"
                      : "dark:bg-slate-900 bg-white border dark:border-slate-800 border-stone-300 text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-850"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg dark:bg-slate-900 bg-white border dark:border-slate-800 border-stone-300 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Reader Modal */}
      <BlogReaderModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
