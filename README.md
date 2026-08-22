# Nahid Karim Ankur — Software Engineer Portfolio

A modern, high-performance, developer-centric portfolio website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and a **Markdown-Powered Engineering Blog Engine**. Designed with **Modern Minimalist Neo-Engineer** aesthetics featuring deep obsidian themes, glassmorphism cards, interactive terminals, systems telemetry, and fast static generation.

---

## ⚡ Key Highlights & Architecture

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript with strict typing
- **Styling**: Tailwind CSS with custom glassmorphism utilities & ambient glow gradients
- **Icons**: Lucide React
- **Responsiveness**: 100% responsive across mobile, tablet, laptop, and desktop viewports
- **Interactive Features**:
  - **Markdown-Powered Blog Section**:
    - Standalone `.md` files with structured YAML frontmatter in `content/blogs/`
    - Instant in-app reading modal with reading progress indicator & shareable URLs
    - Dedicated dynamic Static-Site-Generated (SSG) route for individual articles (`/blog/[slug]`)
    - Custom cyber-dark Markdown renderer with code syntax formatting and 1-click copy buttons
    - Published in-depth engineering writeups (*Node.js Microservices Optimization* & *Docker Swarm Zero-Downtime Deployments*)
  - **Interactive Bash / Node CLI Shell Modal (`⌘K` or `Ctrl+K`)**:
    - Fully interactive command prompt supporting `whoami`, `skills`, `work`, `blog`, `education`, `cv`, `docker ps`, `contact`
  - **Real-Time Systems Telemetry**:
    - Simulated production metrics (99.9%+ Uptime, <45ms API Latency, Docker Swarm multi-node clustering, Grafana/Prometheus)
  - **Production Architecture Blueprint**:
    - 5-stage architecture pipeline (Ingress ➔ Nginx Proxy ➔ Microservices ➔ PostgreSQL/Oracle ➔ Observability)
  - **Interactive Tech Stack Matrix**:
    - Instant category filtering across Backend, Frontend, Database, DevOps, and Monitoring tools
  - **1-Click CV Download & Contact Dispatch**:
    - Direct PDF CV download, quick email/phone clipboard copy, and contact form

---

## ✍️ How to Publish New Blog Articles

Publishing a new blog post is completely automated without needing to touch any application code or component logic:

1. Create a new `.md` file inside `content/blogs/` (e.g. `content/blogs/my-new-article.md`).
2. Add YAML frontmatter at the top of the file:

```markdown
---
title: "Your Article Title Here"
slug: "your-article-slug"
excerpt: "A concise summary of what this article covers."
author: "Nahid Karim Ankur"
role: "Software Engineer @ Celloscope Ltd."
date: "2026-03-01"
readTime: "6 min read"
category: "Backend Architecture"
tags: ["Node.js", "Docker", "PostgreSQL"]
coverIcon: "Server"
---

# Your Article Title

Your markdown content here with code blocks, headings, lists, and images...
```

3. Run `npm run build` or push to your repository. Next.js will automatically parse the markdown, generate static routes (`/blog/your-article-slug`), and display the card on the homepage!

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```

### 3. Deploy
- **Vercel**: Push to GitHub and import directly to [Vercel](https://vercel.com).
- **Docker**: Build container image using standard Node 20 / Alpine base.
- **Static Hosting**: Configured for static HTML export if needed.

---

## 📂 Project Structure

```
h:/Portfolio
├── content/
│   └── blogs/                               # Markdown (.md) blog articles with frontmatter
│       ├── architecting-high-throughput-nodejs-services.md
│       └── zero-downtime-deployments-docker-swarm-nginx.md
├── public/
│   ├── profile.png                          # Profile image (used in Navbar brand)
│   └── Nahid_Karim_Ankur_CV.pdf             # Official CV / Resume
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── blogs/route.ts               # Blog posts JSON API endpoint
│   │   │   └── contact/route.ts             # Contact form dispatch API endpoint
│   │   ├── blog/
│   │   │   └── [slug]/page.tsx              # Dynamic SSG blog post reader page
│   │   ├── globals.css                      # Glassmorphism, animations, cyber-grid styling
│   │   ├── layout.tsx                       # SEO metadata & font setup
│   │   └── page.tsx                         # Server component page loading blog data
│   ├── components/
│   │   ├── Navbar.tsx                       # Glassmorphic floating nav & mobile drawer
│   │   ├── Hero.tsx                         # Headline, typing shell, engineering quote
│   │   ├── SystemsStats.tsx                 # Systems engineering metrics & telemetry
│   │   ├── TechStack.tsx                    # Interactive categorized skill cards
│   │   ├── Experience.tsx                   # Software Engineer @ Celloscope Ltd.
│   │   ├── ArchitecturePipeline.tsx        # Production systems blueprint
│   │   ├── Education.tsx                    # Khulna University & Govt. M.M College
│   │   ├── BlogSection.tsx                  # Interactive blog cards grid & tag filters
│   │   ├── BlogReaderModal.tsx              # In-app full markdown reader modal
│   │   ├── MarkdownRenderer.tsx             # Cyber dark markdown & code block renderer
│   │   ├── HomeClientWrapper.tsx            # Client state & modal coordination
│   │   ├── Contact.tsx                      # Contact channels & direct message form
│   │   ├── InteractiveTerminalModal.tsx     # Full-featured CLI emulator (⌘K)
│   │   └── Footer.tsx                       # Live system clock & social links
│   ├── data/
│   │   └── portfolioData.ts                 # Profile, skills, experience & education data
│   ├── lib/
│   │   ├── blog.ts                          # Markdown & frontmatter parsing engine
│   │   └── utils.ts                         # Utility helpers & clipboard management
│   └── types/
│       └── blog.ts                          # TypeScript interfaces for blog articles
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 👤 Profile & Contacts

- **Name**: Nahid Karim Ankur
- **Role**: Software Engineer
- **Company**: Celloscope Limited
- **Location**: Mohammadpur, Dhaka, Bangladesh
- **Email**: nahidankur@gmail.com
- **Phone**: +8801962856913
- **LinkedIn**: [linkedin.com/in/nahidankur](https://linkedin.com/in/nahidankur)
- **GitHub**: [github.com/nahidankur](https://github.com/nahidankur)
