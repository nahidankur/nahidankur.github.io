"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines: string[] = [];
  let blockKey = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for fenced code block toggle
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim() || "text";
        codeBlockLines = [];
      } else {
        inCodeBlock = false;
        const fullCode = codeBlockLines.join("\n");
        elements.push(
          <CodeBlock
            key={`code-${blockKey++}`}
            code={fullCode}
            language={codeBlockLang}
          />
        );
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      elements.push(
        <hr
          key={`hr-${i}`}
          className="my-8 border-slate-800 border-dashed"
        />
      );
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-2xl sm:text-3xl font-bold font-mono-code text-white mt-8 mb-4 flex items-center space-x-2"
        >
          <span className="text-cyan-400">#</span>
          <span>{renderInline(line.slice(2))}</span>
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl sm:text-2xl font-bold font-mono-code text-slate-100 mt-7 mb-3 flex items-center space-x-2 border-b border-slate-800/80 pb-2"
        >
          <span className="text-cyan-400 font-normal">##</span>
          <span>{renderInline(line.slice(3))}</span>
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg sm:text-xl font-semibold font-mono-code text-slate-200 mt-6 mb-2 flex items-center space-x-2"
        >
          <span className="text-emerald-400 font-normal">###</span>
          <span>{renderInline(line.slice(4))}</span>
        </h3>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-2 border-cyan-400 pl-4 py-2 my-4 bg-slate-900/40 rounded-r-lg text-slate-300 italic font-mono-code text-sm"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Unordered List Items
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const itemText = line.trim().slice(2);
      elements.push(
        <li
          key={`li-${i}`}
          className="flex items-start space-x-2 my-1.5 text-slate-300 text-sm sm:text-base leading-relaxed pl-2"
        >
          <span className="text-cyan-400 font-bold mt-1 text-xs">▸</span>
          <span>{renderInline(itemText)}</span>
        </li>
      );
      continue;
    }

    // Ordered List Items
    const orderedMatch = /^(\d+)\.\s+(.*)$/.exec(line.trim());
    if (orderedMatch) {
      elements.push(
        <li
          key={`oli-${i}`}
          className="flex items-start space-x-2.5 my-1.5 text-slate-300 text-sm sm:text-base leading-relaxed pl-2"
        >
          <span className="font-mono-code text-xs text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
            {orderedMatch[1]}
          </span>
          <span>{renderInline(orderedMatch[2])}</span>
        </li>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      elements.push(<div key={`space-${i}`} className="h-3" />);
      continue;
    }

    // Normal Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="text-slate-300 text-sm sm:text-base leading-relaxed my-2.5 font-sans"
      >
        {renderInline(line)}
      </p>
    );
  }

  // Handle unclosed code block if any
  if (inCodeBlock && codeBlockLines.length > 0) {
    const fullCode = codeBlockLines.join("\n");
    elements.push(
      <CodeBlock
        key={`code-${blockKey++}`}
        code={fullCode}
        language={codeBlockLang}
      />
    );
  }

  return <div className="space-y-1 text-left">{elements}</div>;
}

/**
 * Handles inline styles: bold (**text**), italic (*text*), inline code (`code`), and links [text](url).
 */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = /\*\*(.*?)\*\*/.exec(remaining);
    const codeMatch = /`([^`]+)`/.exec(remaining);
    const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(remaining);

    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index, match: boldMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index, match: codeMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index, match: linkMatch } : null,
    ].filter(Boolean) as { type: string; index: number; match: RegExpExecArray }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    matches.sort((a, b) => a.index - b.index);
    const first = matches[0];

    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-slate-100">
          {first.match[1]}
        </strong>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === "code") {
      parts.push(
        <code
          key={`c-${key++}`}
          className="font-mono-code text-xs sm:text-[13px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-cyan-300"
        >
          {first.match[1]}
        </code>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === "link") {
      parts.push(
        <a
          key={`a-${key++}`}
          href={first.match[2]}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/40 hover:decoration-cyan-300"
        >
          {first.match[1]}
        </a>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    }
  }

  return parts;
}

/**
 * Syntax-styled code block with copy button and terminal header.
 */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono-code">
        <div className="flex items-center space-x-2 text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto font-mono-code text-xs sm:text-[13px] leading-relaxed text-slate-200 bg-slate-950">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
