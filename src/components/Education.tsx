"use client";

import React from "react";
import { EDUCATION } from "@/data/portfolioData";
import { GraduationCap, Award, Calendar, BookOpen, Sparkles } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b dark:border-slate-800 border-stone-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-stone-900 tracking-tight mt-1">
              Education &amp; Qualifications
            </h2>
          </div>
          <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500">
            Computer Science &amp; Engineering Foundation
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-card relative flex flex-col justify-between group hover:border-claude-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 p-8 dark:bg-cyan-500/5 bg-[#d97757]/8 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl dark:bg-slate-900/90 bg-stone-100 border dark:border-slate-800 border-stone-200 group-hover:border-claude-500/30 dark:group-hover:border-cyan-500/30 transition-colors">
                    <GraduationCap className="w-6 h-6 text-claude-700 dark:text-cyan-400" />
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full dark:bg-cyan-500/10 bg-claude-500/10 text-claude-700 dark:text-cyan-300 text-xs font-mono-code border dark:border-cyan-500/30 border-claude-500/30">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold dark:text-white text-stone-900 font-mono-code group-hover:text-claude-700 dark:group-hover:text-cyan-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold dark:text-slate-200 text-stone-800 font-mono-code mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500 mt-1">
                    {edu.field}
                  </p>
                </div>

                {/* Key Coursework or Highlights */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="pt-3 border-t dark:border-slate-800/80 border-stone-200 space-y-2">
                    <p className="text-[11px] font-mono-code dark:text-slate-400 text-stone-500 uppercase tracking-wider flex items-center space-x-1.5 font-semibold">
                      <BookOpen className="w-3 h-3 text-claude-600 dark:text-cyan-400" />
                      <span>Academic Focus:</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg dark:bg-slate-900/80 bg-stone-100 border dark:border-slate-800 border-stone-200 dark:text-slate-300 text-stone-700"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Institutional Seal hint */}
              <div className="mt-6 pt-3 border-t dark:border-slate-800/60 border-stone-200 flex items-center justify-between text-[11px] font-mono-code dark:text-slate-500 text-stone-500">
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-claude-600 dark:text-cyan-400" />
                  <span>Accredited Curriculum</span>
                </span>
                <span className="text-claude-700 dark:text-cyan-400 font-medium">Graduated</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
