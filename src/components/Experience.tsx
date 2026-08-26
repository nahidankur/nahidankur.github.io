"use client";

import React from "react";
import { EXPERIENCE } from "@/data/portfolioData";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b dark:border-slate-800 border-stone-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Production Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-stone-900 tracking-tight mt-1">
              Engineering Work Experience
            </h2>
          </div>
          <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500">
            Enterprise Application Engineering &amp; Infrastructure
          </p>
        </div>

        {/* Experience Showcase Card */}
        <div className="rounded-2xl glass-card p-6 sm:p-8 relative overflow-hidden border dark:border-slate-800 border-stone-200/90 hover:border-claude-500/40 dark:hover:border-cyan-500/40 transition-all duration-300">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 dark:bg-cyan-500/5 bg-[#d97757]/8 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar / Role & Company Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b dark:border-slate-800/80 border-stone-200">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono-code font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Role // Full-Time</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold dark:text-white text-stone-900 font-mono-code">
                {EXPERIENCE.role}
              </h3>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono-code dark:text-slate-400 text-stone-600">
                <div className="flex items-center space-x-1.5 text-claude-700 dark:text-cyan-300 font-semibold">
                  <Building2 className="w-4 h-4 text-claude-600 dark:text-cyan-400" />
                  <span>{EXPERIENCE.company}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-stone-500 dark:text-slate-400" />
                  <span>{EXPERIENCE.period}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-stone-500 dark:text-slate-400" />
                  <span>{EXPERIENCE.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EXPERIENCE.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl dark:bg-slate-900/90 bg-stone-100/90 border dark:border-slate-800 border-stone-200 text-center"
                >
                  <p className="text-[10px] font-mono-code dark:text-slate-400 text-stone-500 uppercase tracking-tight">
                    {m.label}
                  </p>
                  <p className="text-sm font-bold font-mono-code text-claude-700 dark:text-cyan-300 mt-0.5">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Role Summary */}
          <div className="py-6 border-b dark:border-slate-800/80 border-stone-200">
            <p className="dark:text-slate-300 text-stone-700 text-sm sm:text-base leading-relaxed">
              {EXPERIENCE.summary}
            </p>
          </div>

          {/* Responsibilities & Engineering Contributions */}
          <div className="py-6 space-y-4">
            <h4 className="text-xs font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>Key Responsibilities &amp; Systems Engineering Impact</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {EXPERIENCE.responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-3.5 rounded-xl dark:bg-slate-900/40 bg-stone-50/90 border dark:border-slate-800/60 border-stone-200/80 hover:border-stone-400 dark:hover:border-slate-700/80 transition-colors"
                >
                  <div className="p-1 rounded dark:bg-cyan-500/10 bg-claude-500/10 text-claude-700 dark:text-cyan-400 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm dark:text-slate-300 text-stone-700 leading-relaxed font-sans">
                    {resp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used in Production */}
          <div className="pt-6 border-t dark:border-slate-800/80 border-stone-200">
            <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500 uppercase tracking-wider mb-3">
              Production Tech Stack &amp; Tooling at Celloscope:
            </p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono-code dark:text-slate-200 text-stone-700 dark:bg-slate-900 bg-stone-100 border dark:border-slate-800 border-stone-200 hover:border-claude-500/40 hover:text-claude-700 dark:hover:text-cyan-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
