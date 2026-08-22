"use client";

import React from "react";
import { SYSTEMS_METRICS } from "@/data/portfolioData";
import { Activity, Zap, Boxes, Gauge, Shield, Server, CheckCircle2 } from "lucide-react";

export default function SystemsStats() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-indigo-400" />;
      case "Gauge":
        return <Gauge className="w-5 h-5 text-amber-400" />;
      default:
        return <Server className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getGlowClass = (glow: string) => {
    switch (glow) {
      case "emerald":
        return "border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-glow-emerald";
      case "cyan":
        return "border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-glow-cyan";
      case "indigo":
        return "border-indigo-500/30 hover:border-indigo-400/60 hover:shadow-glow-violet";
      case "amber":
        return "border-amber-500/30 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/20";
      default:
        return "border-slate-800 hover:border-slate-700";
    }
  };

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Reliability &amp; Operational Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Software Engineering Metrics
            </h2>
          </div>
          <p className="text-xs font-mono-code text-slate-400">
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
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  {getIcon(metric.icon)}
                </div>
                <div className="flex items-center space-x-1 text-[11px] font-mono-code text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-code text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {metric.label}
                </div>
                <p className="text-xs font-mono-code text-slate-400 pt-1">
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
