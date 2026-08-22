"use client";

import React, { useState } from "react";
import { SKILLS, SkillItem } from "@/data/portfolioData";
import {
  Server,
  Layers,
  Cpu,
  Network,
  Globe,
  Code2,
  Component,
  FileCode2,
  Palette,
  Database,
  HardDrive,
  Boxes,
  Share2,
  Terminal,
  ShieldCheck,
  Gauge,
  GitBranch,
  Sparkles,
  Filter,
} from "lucide-react";

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Stack" },
    { id: "backend", label: "Backend & APIs" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "database", label: "Databases" },
    { id: "devops", label: "DevOps & Cloud" },
    { id: "monitoring", label: "Monitoring" },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory || (selectedCategory === "monitoring" && (s.category === "monitoring" || s.category === "tools")));

  const renderIcon = (iconName: string) => {
    const className = "w-5 h-5 text-cyan-400";
    switch (iconName) {
      case "Server":
        return <Server className="w-5 h-5 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-rose-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-slate-300" />;
      case "Network":
        return <Network className="w-5 h-5 text-cyan-400" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-white" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case "Component":
        return <Component className="w-5 h-5 text-rose-400" />;
      case "FileCode2":
        return <FileCode2 className="w-5 h-5 text-blue-400" />;
      case "Palette":
        return <Palette className="w-5 h-5 text-teal-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-sky-400" />;
      case "HardDrive":
        return <HardDrive className="w-5 h-5 text-amber-400" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-cyan-400" />;
      case "Share2":
        return <Share2 className="w-5 h-5 text-indigo-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-amber-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-orange-400" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5 text-rose-400" />;
      default:
        return <Server className={className} />;
    }
  };

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Competencies &amp; Tooling</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Technical Stack &amp; Skills
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan font-semibold"
                    : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-850"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl glass-card relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors">
                    {renderIcon(skill.icon)}
                  </div>
                  <span
                    className={`text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full border ${skill.tagColor}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-mono-code">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span className="capitalize">{skill.category}</span>
                <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                  &gt; active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
