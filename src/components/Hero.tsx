"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  ArrowRight,
  Copy,
  Check,
  Github,
  Linkedin,
  MapPin,
  Download,
} from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import TypewriterText from "./TypewriterText";

export default function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<"bio" | "stack" | "infra">("bio");

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(PERSONAL_INFO.email);
    if (success) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting effects - Claude terracotta warm deep cream in light mode */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] dark:bg-cyan-500/10 bg-[#d97757]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[420px] h-[320px] dark:bg-emerald-500/8 bg-[#cc785c]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-[380px] h-[260px] dark:bg-violet-500/8 bg-[#e08a6b]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bio & Animated Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top header row: Status Chip */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full dark:bg-slate-900/80 bg-white/90 border dark:border-slate-800 border-stone-200/90 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono-code dark:text-slate-300 text-stone-700">
                  Software Engineer @{" "}
                  <span className="text-claude-700 dark:text-cyan-400 font-semibold">Celloscope Ltd.</span>
                </span>
              </div>
              <p className="text-[11px] font-mono-code dark:text-slate-500 text-stone-500 flex items-center space-x-1.5 pl-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 dark:text-slate-400" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>

            {/* Animated Headline */}
            <TypewriterText
              prefix="Hi, I'm "
              name={PERSONAL_INFO.name}
            />

            {/* Bio Description */}
            <p className="text-base sm:text-lg dark:text-slate-400 text-stone-600 max-w-2xl leading-relaxed">
              Specializing in building scalable backend services, modern full-stack web applications,
              and resilient DevOps infrastructure with{" "}
              <span className="dark:text-slate-200 text-stone-900 font-medium">Node.js</span>,{" "}
              <span className="dark:text-slate-200 text-stone-900 font-medium">Next.js</span>,{" "}
              <span className="dark:text-slate-200 text-stone-900 font-medium">PostgreSQL</span>, and{" "}
              <span className="dark:text-slate-200 text-stone-900 font-medium">Docker</span>.
            </p>

            {/* Philosophy callout badge */}
            <div className="p-4 rounded-xl dark:bg-slate-900/40 bg-white/85 border dark:border-slate-800/80 border-stone-200/90 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-[#d97757] bg-gradient-to-b from-[#c15f3e] via-[#d97757] to-[#e08a6b] dark:bg-cyan-400 dark:from-cyan-400 dark:to-emerald-400" />
              <div className="pl-3.5">
                <p className="text-xs font-mono-code text-claude-700 dark:text-cyan-400/90 uppercase tracking-wider mb-1 font-semibold">
                  // Core Engineering Philosophy
                </p>
                <p className="text-xs sm:text-sm dark:text-slate-300 text-stone-700 italic font-mono-code leading-relaxed">
                  &ldquo;{PERSONAL_INFO.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Call to Actions & CV Download */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Download CV Button */}
              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                className="btn-primary inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-mono-code font-semibold w-full sm:w-auto whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              {/* View Experience */}
              <a
                href="#experience"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-mono-code dark:text-slate-300 text-stone-700 dark:bg-slate-900/80 bg-white hover:bg-stone-50 dark:hover:bg-slate-850 border dark:border-slate-800 border-stone-300 hover:border-claude-500/50 hover:text-claude-700 dark:hover:border-slate-700 dark:hover:text-white transition-all duration-200 w-full sm:w-auto whitespace-nowrap shadow-sm"
              >
                <span>Work Experience</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-mono-code dark:text-slate-300 text-stone-700 dark:bg-slate-900/80 bg-white hover:bg-stone-50 dark:hover:bg-slate-850 border dark:border-slate-800 border-stone-300 hover:border-claude-500/50 hover:text-claude-700 dark:hover:border-slate-700 transition-all duration-200 w-full sm:w-auto whitespace-nowrap shadow-sm"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400 dark:text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick social links */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono-code dark:text-slate-500 text-stone-500">
              <div className="flex items-center space-x-1.5">
                <Github className="w-3.5 h-3.5 text-stone-500 dark:text-slate-400" />
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-claude-700 dark:hover:text-cyan-400 transition-colors"
                >
                  github.com/nahidankur
                </a>
              </div>
              <div className="flex items-center space-x-1.5">
                <Linkedin className="w-3.5 h-3.5 text-stone-500 dark:text-slate-400" />
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-claude-700 dark:hover:text-cyan-400 transition-colors"
                >
                  linkedin.com/in/nahidankur
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Shell / Terminal Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl border dark:border-slate-800 border-stone-300 dark:bg-slate-950/95 bg-white/95 shadow-xl dark:shadow-2xl overflow-hidden group hover:border-claude-500/40 dark:hover:border-slate-700 transition-colors duration-200">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 dark:bg-slate-900/90 bg-stone-100/90 border-b dark:border-slate-800 border-stone-200">
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono-code dark:text-slate-400 text-stone-600 truncate whitespace-nowrap">
                    <span className="hidden sm:inline">ankur@celloscope-node:~</span>
                    <span className="sm:hidden">ankur@node:~</span>
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center space-x-0.5 sm:space-x-1 dark:bg-slate-950/60 bg-stone-200/80 p-0.5 rounded-lg border dark:border-slate-800/80 border-stone-300/80 shrink-0">
                  <button
                    onClick={() => setActiveTab("bio")}
                    className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-mono-code whitespace-nowrap ${
                      activeTab === "bio"
                        ? "dark:bg-slate-800 bg-white dark:text-cyan-300 text-claude-700 font-semibold shadow-sm border dark:border-transparent border-stone-200/80"
                        : "dark:text-slate-500 text-stone-500 hover:text-stone-900 dark:hover:text-slate-300 border border-transparent"
                    }`}
                  >
                    profile.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-mono-code whitespace-nowrap ${
                      activeTab === "stack"
                        ? "dark:bg-slate-800 bg-white dark:text-cyan-300 text-claude-700 font-semibold shadow-sm border dark:border-transparent border-stone-200/80"
                        : "dark:text-slate-500 text-stone-500 hover:text-stone-900 dark:hover:text-slate-300 border border-transparent"
                    }`}
                  >
                    stack.json
                  </button>
                  <button
                    onClick={() => setActiveTab("infra")}
                    className={`px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-mono-code whitespace-nowrap ${
                      activeTab === "infra"
                        ? "dark:bg-slate-800 bg-white dark:text-cyan-300 text-claude-700 font-semibold shadow-sm border dark:border-transparent border-stone-200/80"
                        : "dark:text-slate-500 text-stone-500 hover:text-stone-900 dark:hover:text-slate-300 border border-transparent"
                    }`}
                  >
                    infra.yml
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-5 font-mono-code text-[11px] xs:text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[340px] flex flex-col justify-between text-left dark:bg-transparent bg-white/70">
                {activeTab === "bio" && (
                  <div className="space-y-1">
                    <p className="dark:text-slate-500 text-stone-400 italic">// Developer Profile &amp; Current Position</p>
                    <p>
                      <span className="dark:text-violet-400 text-purple-700 font-medium">const</span>{" "}
                      <span className="dark:text-cyan-300 text-blue-600 font-medium">engineer</span>:{" "}
                      <span className="dark:text-amber-300 text-amber-700 font-semibold">SoftwareEngineer</span> = &#123;
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-slate-300 text-stone-700 font-medium">name</span>:{" "}
                      <span className="dark:text-emerald-300 text-emerald-700 font-medium">&quot;Nahid Karim Ankur&quot;</span>,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-slate-300 text-stone-700 font-medium">company</span>:{" "}
                      <span className="dark:text-emerald-300 text-emerald-700 font-medium">&quot;Celloscope Limited&quot;</span>,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-slate-300 text-stone-700 font-medium">role</span>:{" "}
                      <span className="dark:text-emerald-300 text-emerald-700 font-medium">&quot;Software Engineer&quot;</span>,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-slate-300 text-stone-700 font-medium">location</span>:{" "}
                      <span className="dark:text-emerald-300 text-emerald-700 font-medium">&quot;Dhaka, Bangladesh&quot;</span>,
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-slate-300 text-stone-700 font-medium">primaryDomain</span>: [
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-cyan-300 text-claude-700">
                      &quot;Backend Systems&quot;, &quot;RESTful APIs&quot;,
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-cyan-300 text-claude-700">
                      &quot;Docker Swarm&quot;, &quot;Database Optimization&quot;
                    </p>
                    <p className="pl-3 sm:pl-4 dark:text-slate-300 text-stone-700 font-medium">],</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-slate-300 text-stone-700 font-medium">status</span>:{" "}
                      <span className="dark:text-emerald-400 text-emerald-700 font-semibold">&quot;Active (Sep 2023 - Present)&quot;</span>
                    </p>
                    <p className="dark:text-slate-300 text-stone-700 font-medium">&#125;;</p>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-1">
                    <p className="dark:text-slate-500 text-stone-400 italic">// Verified Technology Stack</p>
                    <p className="dark:text-slate-300 text-stone-700 font-medium">&#123;</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">&quot;backend&quot;</span>: [
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-emerald-300 text-emerald-700">
                      &quot;Node.js&quot;, &quot;NestJS&quot;, &quot;Hapi.js&quot;, &quot;Express.js&quot;
                    </p>
                    <p className="pl-3 sm:pl-4 dark:text-slate-300 text-stone-700 font-medium">],</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">&quot;frontend&quot;</span>: [
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-emerald-300 text-emerald-700">
                      &quot;Next.js&quot;, &quot;React&quot;, &quot;Angular&quot;, &quot;TypeScript&quot;
                    </p>
                    <p className="pl-3 sm:pl-4 dark:text-slate-300 text-stone-700 font-medium">],</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">&quot;databases&quot;</span>: [
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-emerald-300 text-emerald-700">
                      &quot;PostgreSQL&quot;, &quot;Oracle SQL&quot;
                    </p>
                    <p className="pl-3 sm:pl-4 dark:text-slate-300 text-stone-700 font-medium">],</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">&quot;devops&quot;</span>: [
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-emerald-300 text-emerald-700">
                      &quot;Docker&quot;, &quot;Docker Swarm&quot;, &quot;Linux&quot;, &quot;Nginx&quot;
                    </p>
                    <p className="pl-3 sm:pl-4 dark:text-slate-300 text-stone-700 font-medium">],</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">&quot;telemetry&quot;</span>: [
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-emerald-300 text-emerald-700">
                      &quot;Grafana&quot;, &quot;Prometheus&quot;
                    </p>
                    <p className="pl-3 sm:pl-4 dark:text-slate-300 text-stone-700 font-medium">]</p>
                    <p className="dark:text-slate-300 text-stone-700 font-medium">&#125;</p>
                  </div>
                )}

                {activeTab === "infra" && (
                  <div className="space-y-1">
                    <p className="dark:text-slate-500 text-stone-400 italic"># Production Infrastructure Setup</p>
                    <p>
                      <span className="dark:text-violet-400 text-purple-700 font-medium">version</span>:{" "}
                      <span className="dark:text-emerald-300 text-emerald-700">&apos;3.8&apos;</span>
                    </p>
                    <p>
                      <span className="dark:text-violet-400 text-purple-700 font-medium">services</span>:
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">api_gateway</span>:
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-slate-400 text-stone-600">
                      image: <span className="dark:text-emerald-300 text-emerald-700">nginx:alpine</span>
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-slate-400 text-stone-600">ports: [&quot;80:80&quot;, &quot;443:443&quot;]</p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">backend_cluster</span>:
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-slate-400 text-stone-600">
                      image: <span className="dark:text-emerald-300 text-emerald-700">celloscope/core-api:latest</span>
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-slate-400 text-stone-600">
                      deploy: &#123; replicas: <span className="dark:text-amber-400 text-amber-700 font-semibold">4</span>, mode: <span className="dark:text-emerald-300 text-emerald-700">&quot;replicated&quot;</span> &#125;
                    </p>
                    <p className="pl-3 sm:pl-4">
                      <span className="dark:text-cyan-300 text-blue-700 font-medium">telemetry_agent</span>:
                    </p>
                    <p className="pl-6 sm:pl-8 dark:text-slate-400 text-stone-600">
                      image: <span className="dark:text-emerald-300 text-emerald-700">prom/prometheus:v2.50</span>
                    </p>
                  </div>
                )}

                {/* Simulated Terminal Status Footer */}
                <div className="mt-4 pt-3 border-t dark:border-slate-800/80 border-stone-200 flex items-center justify-between text-[10px] sm:text-[11px] dark:text-slate-500 text-stone-500 font-mono-code">
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>node: v20+ / swarm: active</span>
                  </div>
                  <span>UTF-8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
