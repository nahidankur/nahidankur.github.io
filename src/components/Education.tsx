"use client";

import React from "react";
import { EDUCATION } from "@/data/portfolioData";
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Foundations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Education &amp; Credentials
            </h2>
          </div>
          <p className="text-xs font-mono-code text-slate-400">
            Engineering Rigor // Khulna University
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl glass-card relative overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono-code text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-mono-code mb-1">
                  {edu.degree}
                </h3>

                <p className="text-sm font-semibold text-cyan-300 mb-3">
                  {edu.institution}
                </p>

                <p className="text-xs font-mono-code text-slate-400 mb-4">
                  Focus: {edu.field}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {edu.highlights.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span>Verified Academic Degree</span>
                <span className="text-emerald-400">✓ Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
