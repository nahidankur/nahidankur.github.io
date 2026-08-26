"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t dark:border-slate-800/80 border-stone-200 dark:bg-slate-950/80 bg-stone-100/90 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="space-y-1 text-center md:text-left">
            <p className="font-mono-code font-bold dark:text-white text-stone-900 text-base">
              {PERSONAL_INFO.name}{" "}
              <span className="text-claude-700 dark:text-cyan-400 font-normal">// Software Engineer</span>
            </p>
            <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500">
              Celloscope Limited • Mohammadpur, Dhaka, Bangladesh
            </p>
          </div>

          {/* Live Clock & System Status */}
          <div className="flex items-center space-x-3 px-4 py-2 rounded-xl dark:bg-slate-900/90 bg-white/90 border dark:border-slate-800 border-stone-300 font-mono-code text-xs shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="dark:text-slate-300 text-stone-700">SYSTEM HEALTH: NOMINAL</span>
            {currentTime && (
              <span className="text-claude-700 dark:text-cyan-400 border-l dark:border-slate-800 border-stone-200 pl-3">
                {currentTime}
              </span>
            )}
          </div>

          {/* Actions & Scroll to top */}
          <div className="flex items-center space-x-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-stone-300 text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:border-stone-400 transition-colors shadow-sm"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl dark:bg-slate-900 bg-white border dark:border-slate-800 border-stone-300 text-stone-600 dark:text-slate-400 hover:text-claude-700 dark:hover:text-cyan-400 hover:border-claude-500/40 transition-colors shadow-sm"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl dark:bg-cyan-500/10 bg-claude-500/10 border dark:border-cyan-500/30 border-claude-500/30 text-claude-700 dark:text-cyan-400 hover:bg-claude-500/20 dark:hover:bg-cyan-500/20 hover:border-claude-500 transition-all shadow-sm"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t dark:border-slate-900 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code dark:text-slate-500 text-stone-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Nahid Karim Ankur. Engineered for high performance &amp; production reliability.
          </p>
          <p className="flex items-center justify-center space-x-1 text-center sm:text-right">
            <span>Built with Next.js, React, TypeScript &amp; Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
