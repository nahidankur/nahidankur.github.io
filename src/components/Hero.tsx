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
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-[350px] h-[250px] bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Animated Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top header row: Status Chip */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono-code text-slate-300">
                  Software Engineer @{" "}
                  <span className="text-cyan-400 font-semibold">Celloscope Ltd.</span>
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-slate-500 flex items-center space-x-1.5 pl-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Mohammadpur, Dhaka, Bangladesh</span>
              </p>
            </div>

            {/* Animated Headline */}
            <TypewriterText
              prefix="Hi, I'm "
              name={PERSONAL_INFO.name}
            />

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              Specializing in building scalable backend services, modern full-stack web applications,
              and resilient DevOps infrastructure with{" "}
              <span className="text-slate-200 font-medium">Node.js</span>,{" "}
              <span className="text-slate-200 font-medium">Next.js</span>,{" "}
              <span className="text-slate-200 font-medium">PostgreSQL</span>, and{" "}
              <span className="text-slate-200 font-medium">Docker</span>.
            </p>

            {/* Philosophy callout badge */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400 to-emerald-400" />
              <div className="pl-3">
                <p className="text-xs font-mono-code text-cyan-400/90 uppercase tracking-wider mb-1 font-semibold">
                  // Core Engineering Philosophy
                </p>
                <p className="text-xs sm:text-sm text-slate-300 italic font-mono-code leading-relaxed">
                  &ldquo;{PERSONAL_INFO.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Call to Actions & CV Download */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Download CV Button */}
              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-mono-code font-semibold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-glow-cyan transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              {/* View Experience */}
              <a
                href="#experience"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-mono-code text-slate-300 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 hover:text-white transition-all duration-200"
              >
                <span>Work Experience</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Copy Email */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-mono-code text-slate-300 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all duration-200"
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick social links */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono-code text-slate-500">
              <div className="flex items-center space-x-1.5">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  github.com/nahidankur
                </a>
              </div>
              <div className="flex items-center space-x-1.5">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  linkedin.com/in/nahidankur
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Shell / Terminal Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-slate-700 transition-all duration-300">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono-code text-slate-400">
                    ankur@celloscope-node:~
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center space-x-1 bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80">
                  <button
                    onClick={() => setActiveTab("bio")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors ${
                      activeTab === "bio"
                        ? "bg-slate-800 text-cyan-300 font-semibold"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    profile.ts
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors ${
                      activeTab === "stack"
                        ? "bg-slate-800 text-cyan-300 font-semibold"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    stack.json
                  </button>
                  <button
                    onClick={() => setActiveTab("infra")}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono-code transition-colors ${
                      activeTab === "infra"
                        ? "bg-slate-800 text-cyan-300 font-semibold"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    infra.yml
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-5 font-mono-code text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[330px] flex flex-col justify-between">
                {activeTab === "bio" && (
                  <div className="space-y-1">
                    <p className="text-slate-500">// Developer Profile &amp; Current Position</p>
                    <p>
                      <span className="text-violet-400">const</span>{" "}
                      <span className="text-cyan-300">engineer</span>:{" "}
                      <span className="text-amber-300">SoftwareEngineer</span> = &#123;
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-300">name</span>:{" "}
                      <span className="text-emerald-300">&quot;Nahid Karim Ankur&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-300">company</span>:{" "}
                      <span className="text-emerald-300">&quot;Celloscope Limited&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-300">role</span>:{" "}
                      <span className="text-emerald-300">&quot;Software Engineer&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-300">location</span>:{" "}
                      <span className="text-emerald-300">&quot;Dhaka, Bangladesh&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-300">primaryDomain</span>: [
                    </p>
                    <p className="pl-8 text-cyan-300">
                      &quot;Backend Systems&quot;, &quot;RESTful APIs&quot;,
                    </p>
                    <p className="pl-8 text-cyan-300">
                      &quot;Docker Swarm&quot;, &quot;Database Optimization&quot;
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      <span className="text-slate-300">status</span>:{" "}
                      <span className="text-emerald-400">&quot;Active (Sep 2023 - Present)&quot;</span>
                    </p>
                    <p>&#125;;</p>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-1">
                    <p className="text-slate-500">// Verified Technology Stack</p>
                    <p className="text-slate-300">&#123;</p>
                    <p className="pl-4">
                      <span className="text-cyan-300">&quot;backend&quot;</span>: [
                      <span className="text-emerald-300">&quot;Node.js&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;NestJS&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Hapi.js&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Express.js&quot;</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">&quot;frontend&quot;</span>: [
                      <span className="text-emerald-300">&quot;Next.js&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;React&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Angular&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;TypeScript&quot;</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">&quot;databases&quot;</span>: [
                      <span className="text-emerald-300">&quot;PostgreSQL&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Oracle SQL&quot;</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">&quot;devops&quot;</span>: [
                      <span className="text-emerald-300">&quot;Docker&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Docker Swarm&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Linux&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Nginx&quot;</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">&quot;telemetry&quot;</span>: [
                      <span className="text-emerald-300">&quot;Grafana&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Prometheus&quot;</span>]
                    </p>
                    <p className="text-slate-300">&#125;</p>
                  </div>
                )}

                {activeTab === "infra" && (
                  <div className="space-y-1">
                    <p className="text-slate-500"># Production Infrastructure Setup</p>
                    <p>
                      <span className="text-violet-400">version</span>:{" "}
                      <span className="text-emerald-300">&apos;3.8&apos;</span>
                    </p>
                    <p>
                      <span className="text-violet-400">services</span>:
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">api_gateway</span>:
                    </p>
                    <p className="pl-8 text-slate-400">
                      image: <span className="text-emerald-300">nginx:alpine</span>
                    </p>
                    <p className="pl-8 text-slate-400">ports: [&quot;80:80&quot;, &quot;443:443&quot;]</p>
                    <p className="pl-4">
                      <span className="text-cyan-300">backend_cluster</span>:
                    </p>
                    <p className="pl-8 text-slate-400">
                      image: <span className="text-emerald-300">celloscope/core-api:latest</span>
                    </p>
                    <p className="pl-8 text-slate-400">
                      deploy: &#123; replicas: <span className="text-amber-400">4</span>, mode: <span className="text-emerald-300">&quot;replicated&quot;</span> &#125;
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">telemetry_agent</span>:
                    </p>
                    <p className="pl-8 text-slate-400">
                      image: <span className="text-emerald-300">prom/prometheus:v2.50</span>
                    </p>
                  </div>
                )}

                {/* Simulated Terminal Status Footer */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
