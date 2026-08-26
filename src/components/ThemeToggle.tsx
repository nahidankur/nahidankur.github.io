"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <div
        className={`w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 animate-pulse ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Paper Cream theme" : "Switch to Dark theme"}
      title={isDark ? "Switch to Paper Cream theme" : "Switch to Dark theme"}
      className={`relative inline-flex items-center justify-center rounded-lg transition-all duration-300 group outline-none focus:outline-none active:outline-none ring-0 focus:ring-0 select-none ${
        showLabel
          ? "px-3.5 py-2 space-x-2 text-xs font-mono-code w-full justify-between"
          : "p-2"
      } ${
        isDark
          ? "bg-slate-900/80 hover:bg-slate-800 text-amber-400 border border-slate-800 hover:border-amber-400/40"
          : "bg-stone-100 hover:bg-stone-200 text-amber-600 border border-stone-300 hover:border-amber-500/50 shadow-sm"
      } ${className}`}
    >
      <div className="flex items-center space-x-2">
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isDark ? (
            <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12" />
          )}
        </div>
        {showLabel && (
          <span
            className={`font-mono-code text-xs ${
              isDark ? "text-slate-300" : "text-stone-700"
            }`}
          >
            {isDark ? "Paper Cream Mode" : "Dark Cyber Mode"}
          </span>
        )}
      </div>

      {showLabel && (
        <span
          className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded border ${
            isDark
              ? "bg-slate-800 border-slate-700 text-slate-400"
              : "bg-stone-200 border-stone-300 text-stone-600"
          }`}
        >
          {isDark ? "LIGHT" : "DARK"}
        </span>
      )}
    </button>
  );
}
