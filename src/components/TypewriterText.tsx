"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  prefix: string;
  name: string;
}

const ROLES = [
  "Software Engineer @ Celloscope",
  "Node.js & Backend Specialist",
  "Next.js & Full-Stack Developer",
  "DevOps & Microservices Enthusiast",
  "PostgreSQL & DB Optimizer",
];

export default function TypewriterText({ prefix, name }: TypewriterTextProps) {
  // Greeting name typewriter state
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [greetingDone, setGreetingDone] = useState(false);

  // Dynamic role cycling typewriter state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Typewriter for the main greeting title (runs once)
  useEffect(() => {
    const fullGreeting = `${prefix}${name}`;
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= fullGreeting.length) {
        setDisplayedGreeting(fullGreeting.slice(0, currentIndex));
        currentIndex++;
      } else {
        setGreetingDone(true);
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [prefix, name]);

  // 2. Typewriter for cycling subtext roles (starts after main title completes)
  useEffect(() => {
    if (!greetingDone) return;

    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedRole.length < currentRole.length) {
        // Typing character by character
        timeout = setTimeout(() => {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        }, 50);
      } else {
        // Hold on completed role text
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedRole.length > 0) {
        // Deleting characters faster
        timeout = setTimeout(() => {
          setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
        }, 30);
      } else {
        // Move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [greetingDone, displayedRole, isDeleting, roleIndex]);

  return (
    <div className="space-y-3">
      {/* Animated Greeting Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight dark:text-white text-stone-900 leading-[1.15] min-h-[1.2em]">
        <span>{displayedGreeting.slice(0, prefix.length)}</span>
        <span className="gradient-text-cyan font-extrabold">
          {displayedGreeting.slice(prefix.length)}
        </span>
        <span className="inline-block w-1 h-8 sm:h-12 dark:bg-cyan-400 bg-claude-500 ml-1 translate-y-1 sm:translate-y-2 animate-pulse" />
      </h1>

      {/* Dynamic Subtitle Roles */}
      <div className="min-h-[2.25rem] sm:min-h-[2.5rem] flex items-center">
        <p className="text-base sm:text-xl lg:text-2xl font-mono-code dark:text-slate-300 text-stone-700 flex items-center flex-wrap">
          <span className="text-claude-700 dark:text-cyan-400 font-bold mr-2">&gt;</span>
          <span className="dark:text-slate-200 text-stone-800">{displayedRole}</span>
          <span className="inline-block w-2 h-4 sm:h-5 dark:bg-emerald-400 bg-claude-500 ml-1 animate-pulse" />
        </p>
      </div>
    </div>
  );
}
