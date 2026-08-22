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

      const sections = ["about", "skills", "experience", "education", "blog", "contact"];
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
    { name: "About", href: "/#about" },
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
            ? "glass-nav py-3 shadow-lg shadow-black/40"
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
              <div className="relative h-9 w-9 rounded-lg overflow-hidden border border-cyan-500/40 p-0.5 bg-slate-900 group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition-all duration-300 shrink-0">
                <Image
                  src="/profile.png"
                  alt={PERSONAL_INFO.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-cover object-top rounded-[6px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono-code font-bold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                  ANKUR <span className="text-cyan-400 font-normal">//</span> DEV
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono-code text-emerald-400/90 tracking-tight">
                    Celloscope Ltd.
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 px-4 py-1.5 rounded-full shadow-inner">
              {navLinks.map((link) => {
                const sectionId = link.href.replace(/^\/?#/, "");
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code tracking-wider uppercase transition-all duration-200 ${
                      isActive
                        ? "text-cyan-300 bg-cyan-500/15 font-semibold shadow-sm shadow-cyan-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2.5">
              {/* Terminal trigger */}
              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  aria-label="Open Interactive Terminal"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200"
                  title="Press to launch interactive terminal"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>terminal</span>
                  <span className="text-[10px] px-1 bg-slate-900 border border-slate-700 rounded text-slate-400">
                    ⌘K
                  </span>
                </button>
              )}

              {/* Download CV link */}
              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200"
                title="Download CV (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>CV</span>
              </a>

              {/* Contact CTA */}
              <Link
                href="#contact"
                className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-mono-code font-semibold tracking-wide text-black bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg hover:from-cyan-300 hover:to-emerald-300 hover:shadow-glow-cyan transition-all duration-300"
              >
                Connect
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                aria-label="Download CV"
                className="p-2 rounded-lg text-slate-300 bg-slate-800/60 border border-slate-700/60"
              >
                <Download className="w-4 h-4 text-cyan-400" />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  aria-label="Open Interactive Terminal"
                  className="p-2 rounded-lg text-slate-300 bg-slate-800/60 border border-slate-700/60"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-cyan-400" />
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
        <div className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-8 animate-fadeIn">
          <div className="space-y-3">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <p className="text-xs font-mono-code uppercase text-slate-500 tracking-wider">
                System Navigation
              </p>
              <span className="text-xs font-mono-code text-cyan-400">
                Celloscope Ltd.
              </span>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-mono-code text-slate-200 hover:text-cyan-300 hover:bg-slate-900/80 border border-transparent hover:border-slate-800 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            {/* Download CV Mobile Button */}
            <a
              href="/Nahid_Karim_Ankur_CV.pdf"
              download="Nahid_Karim_Ankur_CV.pdf"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-mono-code text-slate-200 bg-slate-900 border border-slate-700 hover:border-cyan-400 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download CV (PDF)</span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-code text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-code text-slate-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-mono-code font-semibold text-black bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-glow-cyan"
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
