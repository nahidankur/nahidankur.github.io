"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Terminal,
  Menu,
  X,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  Download,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["projects", "skills", "experience", "education", "blog", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "/#projects" },
    { name: "Tech Stack", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Education", href: "/#education" },
    { name: "Blog", href: "/#blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-2.5 sm:py-3 shadow-md"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand / Logo with Avatar */}
            <Link
              href="/#hero"
              className="group flex items-center space-x-3 focus:outline-none"
            >
              <div className="relative h-9 w-9 rounded-lg overflow-hidden border dark:border-cyan-500/40 border-claude-500/40 p-0.5 dark:bg-slate-900 bg-stone-100 group-hover:border-claude-500 dark:group-hover:border-cyan-400 group-hover:shadow-glow-claude dark:group-hover:shadow-glow-cyan transition-all duration-300 shrink-0">
                <Image
                  src="/profile.png"
                  alt={PERSONAL_INFO.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover object-top rounded-[6px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono-code font-bold text-sm tracking-wide dark:text-white text-stone-900 group-hover:text-claude-700 dark:group-hover:text-cyan-400 transition-colors">
                  ANKUR <span className="dark:text-cyan-400 text-claude-500 font-normal">//</span> DEV
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono-code text-emerald-600 dark:text-emerald-400/90 font-medium tracking-tight">
                    Celloscope Ltd.
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 dark:bg-slate-900/60 bg-stone-100/85 backdrop-blur-md border dark:border-slate-800/80 border-stone-300/80 px-4 py-1.5 rounded-full shadow-inner">
              {navLinks.map((link) => {
                const sectionId = link.href.replace(/^\/?#/, "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code tracking-wider uppercase transition-all duration-200 ${
                      isActive
                        ? "dark:text-cyan-300 dark:bg-cyan-500/15 text-claude-700 bg-claude-500/15 font-semibold shadow-sm"
                        : "dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:hover:bg-slate-800/50 hover:bg-stone-200/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2.5">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Terminal trigger */}
              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  aria-label="Open Interactive Terminal"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code dark:text-slate-300 text-stone-700 dark:bg-slate-800/60 bg-stone-100 hover:bg-stone-200 dark:hover:bg-slate-800 border dark:border-slate-700/60 border-stone-300 hover:border-claude-500/40 hover:text-claude-700 dark:hover:text-cyan-300 transition-all duration-200"
                  title="Press to launch interactive terminal"
                >
                  <Terminal className="w-3.5 h-3.5 text-claude-600 dark:text-cyan-400" />
                  <span>terminal</span>
                  <span className="text-[10px] px-1 dark:bg-slate-900 bg-stone-200 dark:border-slate-700 border-stone-300 border rounded dark:text-slate-400 text-stone-600">
                    ⌘K
                  </span>
                </button>
              )}

              {/* Download CV link */}
              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code dark:text-slate-200 text-stone-700 dark:bg-slate-900 bg-stone-100 hover:bg-stone-200 dark:hover:bg-slate-850 border dark:border-slate-700 border-stone-300 hover:border-claude-500/40 hover:text-claude-700 dark:hover:text-cyan-300 transition-all duration-200"
                title="Download CV (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-claude-600 dark:text-cyan-400" />
                <span>CV</span>
              </a>

              {/* Contact CTA */}
              <Link
                href="#contact"
                className="btn-primary inline-flex items-center justify-center px-4 py-1.5 text-xs font-mono-code font-semibold tracking-wide rounded-lg"
              >
                Connect
              </Link>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center space-x-1.5">
              <ThemeToggle />

              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                aria-label="Download CV"
                className="p-2 rounded-lg dark:text-slate-300 text-stone-700 dark:bg-slate-800/60 bg-stone-100 border dark:border-slate-700/60 border-stone-300"
              >
                <Download className="w-4 h-4 text-claude-600 dark:text-cyan-400" />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  aria-label="Open Interactive Terminal"
                  className="p-2 rounded-lg dark:text-slate-300 text-stone-700 dark:bg-slate-800/60 bg-stone-100 border dark:border-slate-700/60 border-stone-300"
                >
                  <Terminal className="w-4 h-4 text-claude-600 dark:text-cyan-400" />
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg dark:text-slate-300 text-stone-700 hover:text-stone-900 dark:hover:text-white dark:bg-slate-800/60 bg-stone-100 dark:hover:bg-slate-850 hover:bg-stone-200 border dark:border-slate-700/60 border-stone-300 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-claude-600 dark:text-cyan-400" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden dark:bg-slate-950/95 bg-[#fbf8f3]/98 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn overflow-y-auto">
          <div className="space-y-3">
            <div className="pb-3 border-b dark:border-slate-800 border-stone-200 flex items-center justify-between">
              <p className="text-xs font-mono-code uppercase dark:text-slate-500 text-stone-500 tracking-wider">
                System Navigation
              </p>
              <span className="text-xs font-mono-code text-claude-700 dark:text-cyan-400 font-semibold">
                Celloscope Ltd.
              </span>
            </div>

            {/* Theme Toggle row */}
            <div className="py-1">
              <ThemeToggle showLabel />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-mono-code dark:text-slate-200 text-stone-800 hover:text-claude-700 dark:hover:text-cyan-300 dark:hover:bg-slate-900/80 hover:bg-stone-200/70 border border-transparent dark:hover:border-slate-800 hover:border-stone-300 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 dark:text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t dark:border-slate-800 border-stone-200">
            {/* Download CV Mobile Button */}
            <a
              href="/Nahid_Karim_Ankur_CV.pdf"
              download="Nahid_Karim_Ankur_CV.pdf"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-mono-code dark:text-slate-200 text-stone-800 dark:bg-slate-900 bg-stone-100 border dark:border-slate-700 border-stone-300 hover:border-claude-500 transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-claude-600 dark:text-cyan-400" />
              <span>Download CV (PDF)</span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg dark:bg-slate-900 bg-stone-100 border dark:border-slate-800 border-stone-300 text-xs font-mono-code dark:text-slate-300 text-stone-700 hover:text-stone-900 dark:hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg dark:bg-slate-900 bg-stone-100 border dark:border-slate-800 border-stone-300 text-xs font-mono-code dark:text-slate-300 text-stone-700 hover:text-claude-700 dark:hover:text-cyan-400"
              >
                <Linkedin className="w-4 h-4 text-claude-600 dark:text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-mono-code font-semibold"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
