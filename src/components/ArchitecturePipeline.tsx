"use client";

import React, { useState } from "react";
import { ARCHITECTURE_FLOW } from "@/data/portfolioData";
import { Network, Server, ArrowRight, ShieldCheck, Database, Gauge, Boxes } from "lucide-react";

export default function ArchitecturePipeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-cyan-400 uppercase tracking-widest">
              <Network className="w-3.5 h-3.5" />
              <span>Full-Cycle Systems Lifecycle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Production Architecture Blueprint
            </h2>
          </div>
          <p className="text-xs font-mono-code text-slate-400">
            End-to-End Delivery // Ingress to Observability
          </p>
        </div>

        {/* Interactive Architecture Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {ARCHITECTURE_FLOW.map((flow, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={flow.step}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer p-5 rounded-2xl glass-card relative transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "border-cyan-400/80 bg-slate-900/90 shadow-glow-cyan"
                    : "border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono-code font-bold text-cyan-400">
                      STEP {flow.step}
                    </span>
                    {index < ARCHITECTURE_FLOW.length - 1 && (
                      <ArrowRight className="hidden lg:block w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-mono-code mb-1">
                    {flow.title}
                  </h3>

                  <p className="text-xs font-mono-code text-cyan-300/80 mb-2">
                    {flow.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {flow.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {flow.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Panel for the Selected Step */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono-code text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Architecture Inspection — {ARCHITECTURE_FLOW[activeStep].title}</span>
              </div>
              <h4 className="text-lg font-bold text-white font-mono-code">
                {ARCHITECTURE_FLOW[activeStep].subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
                {ARCHITECTURE_FLOW[activeStep].desc} Built for high availability, transaction safety, and zero-downtime rolling deployments.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-mono-code text-slate-400">
                Active Node:
              </span>
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code">
                node-{activeStep + 1}.celloscope.prod
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
