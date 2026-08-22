"use client";

import React from "react";
import { FEATURED_PROJECTS } from "@/data/portfolioData";
import { Boxes } from "lucide-react";

export default function FeaturedProjects() {
  const getGlowStyles = (glow: string) => {
    switch (glow) {
      case "emerald":
        return {
          border: "border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-glow-emerald",
          badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
          topLine: "bg-gradient-to-r from-emerald-400 to-teal-400",
          dot: "bg-emerald-400",
        };
      case "cyan":
        return {
          border: "border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-glow-cyan",
          badge: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
          topLine: "bg-gradient-to-r from-cyan-400 to-blue-400",
          dot: "bg-cyan-400",
        };
      case "violet":
        return {
          border: "border-violet-500/30 hover:border-violet-400/60 hover:shadow-glow-violet",
          badge: "text-violet-400 border-violet-500/30 bg-violet-500/10",
          topLine: "bg-gradient-to-r from-violet-400 to-fuchsia-400",
          dot: "bg-violet-400",
        };
      default:
        return {
          border: "border-slate-800 hover:border-slate-700",
          badge: "text-slate-300 border-slate-700 bg-slate-800/50",
          topLine: "bg-gradient-to-r from-cyan-400 to-emerald-400",
          dot: "bg-cyan-400",
        };
    }
  };

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
              <Boxes className="w-3.5 h-3.5" />
              <span>Production Systems &amp; Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs font-mono-code text-slate-400">
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
                    <span className="text-[11px] font-mono-code text-slate-400 font-medium">
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
                    <h3 className="text-lg sm:text-xl font-bold text-white font-mono-code group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono-code text-slate-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  {/* Architecture & Engineering Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-[11px] font-mono-code text-cyan-400 uppercase tracking-wider font-semibold">
                      // Key Deliverables
                    </p>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed"
                        >
                          <span className="mt-0.5 text-cyan-400 font-mono-code select-none">
                            ▹
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Metrics & Tech Stack */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  {/* Quick Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/90 flex flex-col"
                        >
                          <span className="text-[10px] font-mono-code text-slate-400">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono-code font-bold text-slate-100 truncate">
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
                        className="text-[11px] font-mono-code px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 group-hover:border-slate-700 transition-colors"
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
