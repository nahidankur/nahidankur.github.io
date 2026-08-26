"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  prefix?: string;
  name: string;
  roles?: string[];
  className?: string;
}

export default function TypewriterText({
  prefix = "Hi, I'm ",
  name = "Nahid Karim Ankur",
  roles = [
    "Software Engineer @ Celloscope Ltd.",
    "Backend & REST API Architect",
    "PostgreSQL & Database Specialist",
    "DevOps & Docker Swarm Practitioner",
    "Next.js & Full-Stack Developer",
  ],
  className = "",
}: TypewriterTextProps) {
  // Main greeting text
  const fullGreeting = `${prefix}${name}`;
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [greetingComplete, setGreetingComplete] = useState(false);

  // Subtitle role typing animation
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Type the main headline once on mount
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullGreeting.length) {
        setDisplayedGreeting(fullGreeting.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setGreetingComplete(true);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [fullGreeting]);

  // Cycle through the roles once greeting is complete
  useEffect(() => {
    if (!greetingComplete) return;

    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < currentRole.length) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex, greetingComplete, roles]);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Animated Greeting Title */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] min-h-[1.2em]">
        <span>{displayedGreeting.slice(0, prefix.length)}</span>
        <span className="gradient-text-cyan font-extrabold">
          {displayedGreeting.slice(prefix.length)}
        </span>
        <span className="inline-block w-1 h-8 sm:h-12 bg-cyan-400 ml-1 translate-y-1 sm:translate-y-2 animate-pulse" />
      </h1>

      {/* Dynamic Subtitle Roles */}
      <div className="min-h-[2.25rem] sm:min-h-[2.5rem] flex items-center">
        <p className="text-base sm:text-xl lg:text-2xl font-mono-code text-slate-300 flex items-center flex-wrap">
          <span className="text-cyan-400 font-bold mr-2">&gt;</span>
          <span className="text-slate-200">{displayedRole}</span>
          <span className="inline-block w-2 h-4 sm:h-5 bg-emerald-400 ml-1 animate-pulse" />
        </p>
      </div>
    </div>
  );
}
