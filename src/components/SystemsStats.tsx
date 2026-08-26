"use client";

import React from "react";
import { SYSTEMS_METRICS } from "@/data/portfolioData";
import { Activity, Zap, Boxes, Gauge, Shield, Server } from "lucide-react";

export default function SystemsStats() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-claude-600 dark:text-cyan-400" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Server className="w-5 h-5 text-claude-600 dark:text-cyan-400" />;
    }
  };

  const getGlowClass = (glow: string) => {
    switch (glow) {
      case "emerald":
        return "dark:border-emerald-500/30 border-claude-500/30 hover:border-claude-500/60 dark:hover:border-emerald-500/60 dark:hover:shadow-glow-emerald hover:shadow-lg";
      case "cyan":
        return "dark:border-cyan-500/30 border-claude-500/30 hover:border-claude-500/60 dark:hover:border-cyan-500/60 dark:hover:shadow-glow-cyan hover:shadow-lg";
      case "indigo":
        return "dark:border-indigo-500/30 border-claude-600/30 hover:border-claude-600/60 dark:hover:border-indigo-500/60 dark:hover:shadow-glow-violet hover:shadow-lg";
      case "amber":
        return "dark:border-amber-500/30 border-amber-600/30 hover:border-amber-500/60 hover:shadow-lg dark:hover:shadow-amber-500/20";
      default:
        return "dark:border-slate-800 border-stone-200 hover:border-stone-400 dark:hover:border-slate-700";
    }
  };

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b dark:border-slate-800 border-stone-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Reliability &amp; Operational Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-stone-900 tracking-tight mt-1">
              Software Engineering Metrics
            </h2>
          </div>
          <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500">
            Production Reliability Benchmarks // High Availability
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SYSTEMS_METRICS.map((metric) => (
            <div
              key={metric.id}
              className={`p-6 rounded-2xl glass-card transition-all duration-300 relative overflow-hidden group ${getGlowClass(
                metric.glow
              )}`}
            >
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {getIcon(metric.icon)}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl dark:bg-slate-900/80 bg-stone-100 border dark:border-slate-800 border-stone-200">
                  {getIcon(metric.icon)}
                </div>
                <div className="flex items-center space-x-1 text-[11px] font-mono-code dark:text-slate-400 text-stone-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-code dark:text-white text-stone-900 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold dark:text-slate-200 text-stone-800">
                  {metric.label}
                </div>
                <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500 pt-1">
                  {metric.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
