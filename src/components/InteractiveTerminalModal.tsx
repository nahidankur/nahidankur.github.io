"use client";

import React, { useState, useEffect, useRef } from "react";
import { PERSONAL_INFO, EXPERIENCE, EDUCATION } from "@/data/portfolioData";
import { X, Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function InteractiveTerminalModal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 dark:text-slate-300 text-stone-700">
          <p className="text-cyan-600 dark:text-cyan-400 font-bold">
            Ankur Interactive Shell v2.4 (x86_64-celloscope-linux-gnu)
          </p>
          <p className="dark:text-slate-400 text-stone-600">
            Type <span className="text-amber-600 dark:text-amber-300 font-semibold">&apos;help&apos;</span> to see available commands or <span className="text-amber-600 dark:text-amber-300 font-semibold">&apos;cv&apos;</span> to download resume.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case "help":
      case "?":
        response = (
          <div className="space-y-1 dark:text-slate-300 text-stone-700">
            <p className="text-claude-700 dark:text-cyan-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">whoami</span> - Developer bio &amp; profile</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">skills</span> - List technical skills &amp; stack</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">work</span> - Current role at Celloscope</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">notes</span> - Engineering Notes &amp; writeups</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">education</span> - Academic background</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">cv / resume</span> - Download official PDF CV</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">contact</span> - Phone, email, socials</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">docker ps</span> - Active production services</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">clear</span> - Clear terminal screen</div>
              <div><span className="text-emerald-600 dark:text-emerald-400 font-semibold">exit</span> - Close terminal window</div>
            </div>
          </div>
        );
        break;

      case "notes":
      case "blog":
      case "blogs":
      case "articles":
        response = (
          <div className="space-y-2 dark:text-slate-300 text-stone-700 text-xs">
            <div className="flex items-center justify-between">
              <p className="text-claude-700 dark:text-cyan-400 font-bold">Engineering Notes &amp; Articles:</p>
              <a href="/notes" className="text-claude-700 dark:text-cyan-300 underline font-semibold text-[11px]">
                View all notes &rarr;
              </a>
            </div>
            <div className="space-y-1.5 pl-2">
              <div>
                <p className="dark:text-white text-stone-900 font-semibold">1. Architecting High-Throughput Node.js Microservices</p>
                <p className="dark:text-slate-400 text-stone-500 text-[11px]">Event loop lag mitigation &amp; PostgreSQL connection pooling.</p>
                <a href="/blog/architecting-high-throughput-nodejs-services" className="text-claude-700 dark:text-cyan-300 underline text-[11px]">
                  Read article &rarr;
                </a>
              </div>
              <div className="pt-1">
                <p className="dark:text-white text-stone-900 font-semibold">2. Zero-Downtime Container Deployments with Docker Swarm</p>
                <p className="dark:text-slate-400 text-stone-500 text-[11px]">Rolling updates, Nginx edge proxying, and Prometheus telemetry.</p>
                <a href="/blog/zero-downtime-deployments-docker-swarm-nginx" className="text-claude-700 dark:text-cyan-300 underline text-[11px]">
                  Read article &rarr;
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "bio":
        response = (
          <div className="space-y-1 dark:text-slate-300 text-stone-700">
            <p className="dark:text-white text-stone-900 font-bold">{PERSONAL_INFO.name}</p>
            <p className="text-cyan-700 dark:text-cyan-300">{PERSONAL_INFO.role} @ {PERSONAL_INFO.company}</p>
            <p className="dark:text-slate-400 text-stone-600">{PERSONAL_INFO.bio}</p>
            <p className="text-xs dark:text-slate-500 text-stone-500 italic mt-1">&quot;{PERSONAL_INFO.quote}&quot;</p>
          </div>
        );
        break;

      case "cv":
      case "resume":
        // Trigger auto-download
        if (typeof window !== "undefined") {
          const a = document.createElement("a");
          a.href = "/Nahid_Karim_Ankur_CV.pdf";
          a.download = "Nahid_Karim_Ankur_CV.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
        response = (
          <div className="space-y-2 text-emerald-700 dark:text-emerald-300 text-xs">
            <p className="flex items-center space-x-1.5">
              <span>✓ Downloading Nahid_Karim_Ankur_CV.pdf...</span>
            </p>
            <p className="dark:text-slate-400 text-stone-600">
              Direct link:{" "}
              <a
                href="/Nahid_Karim_Ankur_CV.pdf"
                download="Nahid_Karim_Ankur_CV.pdf"
                className="text-cyan-600 dark:text-cyan-300 underline"
              >
                Click here if download did not start
              </a>
            </p>
          </div>
        );
        break;

      case "skills":
      case "stack":
        response = (
          <div className="space-y-2 dark:text-slate-300 text-stone-700">
            <p className="text-cyan-600 dark:text-cyan-400 font-bold">Tech Stack Matrix:</p>
            <div className="space-y-1 text-xs">
              <p><span className="text-emerald-700 dark:text-emerald-300 font-semibold">Backend:</span> Node.js, NestJS, Express.js, Hapi.js, RESTful APIs, Microservices</p>
              <p><span className="text-sky-700 dark:text-sky-300 font-semibold">Frontend:</span> Next.js, React, Angular, TypeScript, Tailwind CSS, Material UI</p>
              <p><span className="text-amber-700 dark:text-amber-300 font-semibold">Databases:</span> PostgreSQL, Oracle SQL</p>
              <p><span className="text-indigo-700 dark:text-indigo-300 font-semibold">DevOps &amp; Cloud:</span> Docker, Docker Swarm, Linux, Nginx, VM Management</p>
              <p><span className="text-orange-700 dark:text-orange-300 font-semibold">Monitoring:</span> Grafana, Prometheus, GitLab CI/CD</p>
            </div>
          </div>
        );
        break;

      case "work":
      case "experience":
        response = (
          <div className="space-y-1 dark:text-slate-300 text-stone-700 text-xs">
            <p className="text-cyan-600 dark:text-cyan-400 font-bold">{EXPERIENCE.role} @ {EXPERIENCE.company} ({EXPERIENCE.period})</p>
            <p className="dark:text-slate-400 text-stone-600">{EXPERIENCE.summary}</p>
            <p className="text-emerald-700 dark:text-emerald-400 font-semibold mt-1">Core Focus: Scalable REST APIs, Docker Swarm, Linux VM, PostgreSQL, Grafana/Prometheus</p>
          </div>
        );
        break;

      case "education":
        response = (
          <div className="space-y-2 dark:text-slate-300 text-stone-700 text-xs">
            {EDUCATION.map((edu, i) => (
              <div key={i}>
                <p className="text-cyan-700 dark:text-cyan-300 font-bold">{edu.degree}</p>
                <p className="dark:text-slate-400 text-stone-600">{edu.institution} ({edu.period}) — {edu.field}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 dark:text-slate-300 text-stone-700 text-xs">
            <p><span className="text-cyan-600 dark:text-cyan-400 font-semibold">Email:</span> {PERSONAL_INFO.email}</p>
            <p><span className="text-cyan-600 dark:text-cyan-400 font-semibold">Phone:</span> {PERSONAL_INFO.phone}</p>
            <p><span className="text-cyan-600 dark:text-cyan-400 font-semibold">LinkedIn:</span> {PERSONAL_INFO.linkedin}</p>
            <p><span className="text-cyan-600 dark:text-cyan-400 font-semibold">GitHub:</span> {PERSONAL_INFO.github}</p>
            <p><span className="text-cyan-600 dark:text-cyan-400 font-semibold">Location:</span> {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case "docker ps":
        response = (
          <div className="space-y-1 dark:text-slate-300 text-stone-700 text-[11px] font-mono-code overflow-x-auto">
            <p className="dark:text-slate-500 text-stone-400">CONTAINER ID   IMAGE                 STATUS          PORTS               NAMES</p>
            <p><span className="text-emerald-600 dark:text-emerald-400">c98f21e0a1</span>   celloscope/api:latest Up 14 days      0.0.0.0:8080-&gt;8080 api_core.1</p>
            <p><span className="text-emerald-600 dark:text-emerald-400">81b9e0231d</span>   postgres:16-alpine    Up 14 days      0.0.0.0:5432-&gt;5432 pg_cluster.1</p>
            <p><span className="text-emerald-600 dark:text-emerald-400">f4a21098ec</span>   nginx:alpine          Up 14 days      0.0.0.0:443-&gt;443   edge_proxy.1</p>
            <p><span className="text-emerald-600 dark:text-emerald-400">339d1b091f</span>   prom/prometheus       Up 14 days      0.0.0.0:9090-&gt;9090 telemetry.1</p>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        response = (
          <p className="text-rose-600 dark:text-rose-400 text-xs">
            command not found: <span className="font-bold">{cmd}</span>. Type <span className="text-amber-600 dark:text-amber-300 font-semibold">&apos;help&apos;</span> to see available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 dark:bg-black/80 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl border dark:border-slate-700/80 border-stone-300 dark:bg-slate-950 bg-[#fbf8f3] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 dark:bg-slate-900 bg-stone-100 border-b dark:border-slate-800 border-stone-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div className="flex items-center space-x-1.5 ml-3">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-mono-code dark:text-slate-300 text-stone-700 font-semibold">
                ankur@celloscope-sh
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono-code dark:text-slate-500 text-stone-500 hidden sm:inline">
              ESC to close
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:hover:bg-slate-800 hover:bg-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div
          className="p-4 sm:p-6 font-mono-code overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm dark:bg-slate-950/95 bg-white"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center space-x-2 dark:text-slate-400 text-stone-500">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">&gt;</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={onSubmit}
          className="px-4 py-3 dark:bg-slate-900/90 bg-stone-100 border-t dark:border-slate-800 border-stone-200 flex items-center space-x-2"
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono-code">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command ('help', 'skills', 'cv', 'work', 'contact')..."
            className="flex-1 bg-transparent border-none dark:text-white text-stone-900 font-mono-code text-xs sm:text-sm focus:outline-none dark:placeholder:text-slate-600 placeholder:text-stone-400"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg dark:text-slate-400 text-stone-600 hover:text-cyan-600 dark:hover:text-cyan-400 dark:hover:bg-slate-800 hover:bg-stone-200 transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
