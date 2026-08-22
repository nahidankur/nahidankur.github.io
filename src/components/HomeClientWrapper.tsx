"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SystemsStats from "@/components/SystemsStats";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import InteractiveTerminalModal from "@/components/InteractiveTerminalModal";
import { BlogPost } from "@/types/blog";

interface HomeClientWrapperProps {
  posts: BlogPost[];
}

export default function HomeClientWrapper({ posts }: HomeClientWrapperProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-slate-100 cyber-grid">
      {/* Subtle ambient lighting layers */}
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-cyan" />
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-violet" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

        <main className="flex-1 space-y-12 sm:space-y-16">
          <Hero />
          <SystemsStats />
          <TechStack />
          <Experience />
          <Education />
          <BlogSection initialPosts={posts} />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Interactive Terminal Modal */}
      <InteractiveTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
