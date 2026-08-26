"use client";

import React from "react";
import { FEATURED_PROJECTS } from "@/data/portfolioData";
import { Boxes } from "lucide-react";

export default function FeaturedProjects() {
  const getGlowStyles = (glow: string) => {
    switch (glow) {
      case "emerald":
        return {
          border: "dark:border-emerald-500/30 border-[#d97757]/30 hover:border-[#d97757]/60 dark:hover:border-emerald-500/60 dark:hover:shadow-glow-emerald hover:shadow-lg",
          badge: "text-[#c15f3e] dark:text-emerald-400 border-[#d97757]/30 dark:border-emerald-500/30 bg-[#d97757]/10 dark:bg-emerald-500/10",
          topLine: "bg-[#d97757] bg-gradient-to-r from-[#c15f3e] via-[#d97757] to-[#e08a6b] dark:bg-emerald-400 dark:from-emerald-400 dark:to-teal-400",
          dot: "bg-[#d97757] dark:bg-emerald-400",
        };
      case "cyan":
        return {
          border: "dark:border-cyan-500/30 border-[#d97757]/30 hover:border-[#d97757]/60 dark:hover:border-cyan-500/60 dark:hover:shadow-glow-cyan hover:shadow-lg",
          badge: "text-[#c15f3e] dark:text-cyan-400 border-[#d97757]/30 dark:border-cyan-500/30 bg-[#d97757]/10 dark:bg-cyan-500/10",
          topLine: "bg-[#d97757] bg-gradient-to-r from-[#c15f3e] via-[#d97757] to-[#e08a6b] dark:bg-cyan-400 dark:from-cyan-400 dark:to-blue-400",
          dot: "bg-[#d97757] dark:bg-cyan-400",
        };
      case "violet":
        return {
          border: "dark:border-violet-500/30 border-[#c15f3e]/30 hover:border-[#c15f3e]/60 dark:hover:border-violet-500/60 dark:hover:shadow-glow-violet hover:shadow-lg",
          badge: "text-[#9c492e] dark:text-violet-400 border-[#c15f3e]/30 dark:border-violet-500/30 bg-[#d97757]/10 dark:bg-violet-500/10",
          topLine: "bg-[#c15f3e] bg-gradient-to-r from-[#9c492e] via-[#c15f3e] to-[#d97757] dark:bg-violet-400 dark:from-violet-400 dark:to-fuchsia-400",
          dot: "bg-[#c15f3e] dark:bg-violet-400",
        };
      default:
        return {
          border: "dark:border-slate-800 border-stone-300 hover:border-stone-400 dark:hover:border-slate-700",
          badge: "dark:text-slate-300 text-stone-700 dark:border-slate-700 border-stone-300 dark:bg-slate-800/50 bg-stone-100",
          topLine: "bg-[#d97757] bg-gradient-to-r from-[#c15f3e] via-[#d97757] to-[#e08a6b] dark:bg-cyan-400 dark:from-cyan-400 dark:to-emerald-400",
          dot: "bg-[#d97757] dark:bg-cyan-400",
        };
    }
  };

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b dark:border-slate-800 border-stone-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-widest">
              <Boxes className="w-3.5 h-3.5" />
              <span>Production Systems &amp; Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-stone-900 tracking-tight mt-1">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500">
            Enterprise Platforms // High Concurrency &amp; Reliability
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {FEATURED_PROJECTS.map((project) => {
            const styles = getGlowStyles(project.glowColor);

            return (
              <div
                key={project.id}
                className={`p-6 rounded-2xl glass-card relative flex flex-col justify-between transition-all duration-300 overflow-hidden group ${styles.border}`}
              >
                {/* Top Accent Gradient Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${styles.topLine}`} />

                {/* Card Top & Body */}
                <div className="space-y-4">
                  {/* Top Metadata Row: Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono-code dark:text-slate-400 text-stone-500 font-medium">
                      {project.category}
                    </span>
                    <div
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code border ${styles.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot} animate-pulse`} />
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  {/* Project Title & Subtitle */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold dark:text-white text-stone-900 font-mono-code group-hover:text-claude-700 dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm dark:text-slate-300 text-stone-700 leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  {/* Architecture & Engineering Highlights */}
                  <div className="space-y-2 pt-2 border-t dark:border-slate-800/80 border-stone-200">
                    <p className="text-[11px] font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                      // Key Deliverables
                    </p>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2 text-xs dark:text-slate-300 text-stone-700 leading-relaxed"
                        >
                          <span className="mt-0.5 text-claude-600 dark:text-cyan-400 font-mono-code select-none">
                            ▹
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Metrics & Tech Stack */}
                <div className="mt-6 pt-4 border-t dark:border-slate-800/80 border-stone-200 space-y-3">
                  {/* Quick Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg dark:bg-slate-900/90 bg-stone-100/90 border dark:border-slate-800/90 border-stone-200 flex flex-col"
                        >
                          <span className="text-[10px] font-mono-code dark:text-slate-400 text-stone-500">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono-code font-bold dark:text-slate-100 text-stone-800 truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono-code px-2 py-0.5 rounded-md dark:bg-slate-950/80 bg-stone-100 border dark:border-slate-800 border-stone-200 dark:text-slate-300 text-stone-700 group-hover:border-stone-400 dark:group-hover:border-slate-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
