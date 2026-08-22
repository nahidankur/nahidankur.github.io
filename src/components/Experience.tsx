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
  Layers,
  Server,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Production Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Engineering Work Experience
            </h2>
          </div>
          <p className="text-xs font-mono-code text-slate-400">
            Enterprise Application Engineering &amp; Infrastructure
          </p>
        </div>

        {/* Experience Showcase Card */}
        <div className="rounded-2xl glass-card p-6 sm:p-8 relative overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar / Role & Company Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Role // Full-Time</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono-code">
                {EXPERIENCE.role}
              </h3>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono-code text-slate-400">
                <div className="flex items-center space-x-1.5 text-cyan-300 font-semibold">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{EXPERIENCE.company}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{EXPERIENCE.period}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{EXPERIENCE.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EXPERIENCE.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center"
                >
                  <p className="text-[10px] font-mono-code text-slate-400 uppercase tracking-tight">
                    {m.label}
                  </p>
                  <p className="text-sm font-bold font-mono-code text-cyan-300 mt-0.5">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Role Summary */}
          <div className="py-6 border-b border-slate-800/80">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {EXPERIENCE.summary}
            </p>
          </div>

          {/* Responsibilities & Engineering Contributions */}
          <div className="py-6 space-y-4">
            <h4 className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>Key Responsibilities &amp; Systems Engineering Impact</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {EXPERIENCE.responsibilities.map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/80 transition-colors"
                >
                  <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {resp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used in Production */}
          <div className="pt-6 border-t border-slate-800/80">
            <p className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-3">
              Production Tech Stack &amp; Tooling at Celloscope:
            </p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono-code text-slate-200 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
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
