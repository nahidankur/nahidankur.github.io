export interface SkillItem {
  name: string;
  category: "backend" | "frontend" | "database" | "devops" | "monitoring" | "tools";
  level: "Advanced" | "Proficient" | "Core";
  description: string;
  icon: string;
  tagColor: string;
  glowColor: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  status: "Current" | "Past";
  summary: string;
  responsibilities: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  field: string;
  grade?: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  glowColor: "cyan" | "emerald" | "violet" | "amber";
}

export const PERSONAL_INFO = {
  name: "Nahid Karim Ankur",
  role: "Software Engineer",
  company: "Celloscope Limited",
  location: "Mohammadpur, Dhaka, Bangladesh",
  email: "nahidankur@gmail.com",
  phone: "+8801962856913",
  linkedin: "https://linkedin.com/in/nahidankur",
  github: "https://github.com/nahidankur",
  portfolio: "https://nahidankur.github.io",
  status: "Available for high-impact engineering opportunities",
  bio: "Software Engineer specializing in building scalable backend services, modern full-stack applications, and robust DevOps/production infrastructure. Passionate about system architecture, database optimization, and end-to-end reliability from code to container.",
  quote: "A true engineer does not merely forge the code. They wield it in production, guard its health, and stand ready to maintain it when the storms arrive.",
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "sib",
    title: "Staff Information Bureau (SIB)",
    subtitle: "Nationwide MFI Staff Verification & Bureau Platform",
    category: "Enterprise Microfinance",
    badge: "Scale: 1M+ Users",
    summary:
      "A centralized verification and management platform engineered to support 1M+ user records across microfinance institutions (MFIs) and regulatory authorities (MRA).",
    highlights: [
      "Assisted in preparing for a production launch aimed at 1 million+ users across MFIs nationwide.",
      "Developed RESTful backend APIs using Node.js with Hapi.js, ensuring secure, high-throughput, and scalable endpoints.",
      "Contributed to frontend development using Angular 16, NG-ZORRO, and Tailwind CSS, significantly improving UI responsiveness and usability.",
      "Implemented multi-tenant Role-Based Access Control (RBAC) for different user tiers including MFI, MRA, and Staff.",
      "Integrated the system with Oracle Database, ensuring optimal data handling and efficient transaction flows.",
    ],
    technologies: [
      "Node.js",
      "Hapi.js",
      "Angular 16",
      "NG-ZORRO",
      "Oracle SQL",
      "Tailwind CSS",
      "RBAC",
    ],
    metrics: [
      { label: "Target Capacity", value: "1M+ Users" },
      { label: "Architecture", value: "Multi-Tier RBAC" },
    ],
    glowColor: "emerald",
  },
  {
    id: "ims",
    title: "Integrated Microfinance Solution (IMS)",
    subtitle: "Core Financial Operations & Workflow Automation",
    category: "Financial Systems",
    badge: "Enterprise Core",
    summary:
      "A comprehensive microfinance platform engineered for reliable transactional integrity, flexible authorization matrices, and high-performance financial management.",
    highlights: [
      "Developed RESTful APIs using Node.js (Hapi.js) to handle critical, secure, and scalable backend business logic.",
      "Implemented Dynamic Role-Based Access Control to manage user permissions flexibly, granularly, and securely.",
      "Contributed to frontend development using Angular 18 and NG-ZORRO, delivering a responsive, modern single-page user experience.",
      "Utilized PostgreSQL for reliable relational storage, query plan optimization, and robust ACID transaction handling.",
    ],
    technologies: [
      "Node.js",
      "Hapi.js",
      "Angular 18",
      "NG-ZORRO",
      "PostgreSQL",
      "REST APIs",
      "Dynamic RBAC",
    ],
    metrics: [
      { label: "Database", value: "PostgreSQL" },
      { label: "Frontend", value: "Angular 18" },
    ],
    glowColor: "cyan",
  },
  {
    id: "univerge",
    title: "Univerge — A Billing Solution",
    subtitle: "Telecom Rating, Revenue Analytics & Automated Invoicing",
    category: "Telecom & Billing Engine",
    badge: "Production Live",
    summary:
      "A high-throughput billing and reporting system deployed in production for telecommunications clients to track revenue, manage CDRs, and automate rating.",
    highlights: [
      "Built and deployed a scalable billing solution actively powering revenue operations for Tele-Exchange and CrossWorld clients.",
      "Implemented secure login systems and executive analytics dashboards for real-time revenue and call tracking.",
      "Developed automated rerating pipelines, failed call management, monthly financial reporting, and scheduled billing workflows.",
      "Engineered reliable background processing routines for accurate call reconciliation and error-free invoice generation.",
    ],
    technologies: [
      "Node.js",
      "PostgreSQL",
      "Automated Billing",
      "Call Rerating",
      "Executive Dashboards",
      "Analytics",
    ],
    metrics: [
      { label: "Clients", value: "Tele-Exchange & CrossWorld" },
      { label: "Core Logic", value: "Automated Rerating" },
    ],
    glowColor: "violet",
  },
];

export const SYSTEMS_METRICS = [
  {
    id: "production-uptime",
    label: "Target Availability",
    value: "99.9%+",
    subtext: "High-reliability architectures",
    icon: "Activity",
    glow: "emerald",
  },
  {
    id: "api-performance",
    label: "Optimized API Latency",
    value: "< 45ms",
    subtext: "PostgreSQL & Node tuning",
    icon: "Zap",
    glow: "cyan",
  },
  {
    id: "infrastructure",
    label: "Container Orchestration",
    value: "Docker Swarm",
    subtext: "Automated multi-node clustering",
    icon: "Boxes",
    glow: "indigo",
  },
  {
    id: "monitoring",
    label: "Telemetry Observability",
    value: "24/7",
    subtext: "Grafana & Prometheus metrics",
    icon: "Gauge",
    glow: "amber",
  },
];

export const SKILLS: SkillItem[] = [
  // Backend
  {
    name: "Node.js",
    category: "backend",
    level: "Advanced",
    description: "Asynchronous runtime, event-driven architectures, microservices, and high-throughput server systems.",
    icon: "Server",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    name: "NestJS",
    category: "backend",
    level: "Proficient",
    description: "Enterprise modular backend architecture with dependency injection, TypeScript decorators, and microservices.",
    icon: "Layers",
    tagColor: "text-red-400 border-red-500/30 bg-red-500/10",
    glowColor: "rgba(239, 68, 68, 0.25)",
  },
  {
    name: "Express.js & Hapi.js",
    category: "backend",
    level: "Advanced",
    description: "Robust REST API design, custom middleware pipelines, authentication, and validation layers.",
    icon: "Cpu",
    tagColor: "text-slate-300 border-slate-500/30 bg-slate-500/10",
    glowColor: "rgba(148, 163, 184, 0.25)",
  },
  {
    name: "RESTful APIs & Microservices",
    category: "backend",
    level: "Advanced",
    description: "Clean architecture, service discovery, scalable contract design, and inter-service communication.",
    icon: "Network",
    tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    glowColor: "rgba(6, 182, 212, 0.25)",
  },

  // Frontend
  {
    name: "Next.js",
    category: "frontend",
    level: "Proficient",
    description: "App Router, Server Components, SSR/SSG rendering, SEO optimization, and high-performance web experiences.",
    icon: "Globe",
    tagColor: "text-white border-white/30 bg-white/10",
    glowColor: "rgba(255, 255, 255, 0.25)",
  },
  {
    name: "React",
    category: "frontend",
    level: "Proficient",
    description: "Modern hooks, component lifecycles, state management, concurrent mode, and dynamic UIs.",
    icon: "Code2",
    tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    glowColor: "rgba(6, 182, 212, 0.25)",
  },
  {
    name: "Angular",
    category: "frontend",
    level: "Advanced",
    description: "Enterprise single-page applications, RxJS reactive streams, dependency injection, and NG-ZORRO / Material UI.",
    icon: "Component",
    tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    glowColor: "rgba(244, 63, 94, 0.25)",
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "Advanced",
    description: "Strict static typing, complex generic types, interfaces, and end-to-end type safety.",
    icon: "FileCode2",
    tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    glowColor: "rgba(59, 130, 246, 0.25)",
  },
  {
    name: "Tailwind CSS & Material UI",
    category: "frontend",
    level: "Advanced",
    description: "Modern utility-first styling, design system tokens, responsive layouts, and accessible component suites.",
    icon: "Palette",
    tagColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    glowColor: "rgba(20, 184, 166, 0.25)",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "database",
    level: "Advanced",
    description: "Relational database modeling, complex indexing, query plan analysis, ACID transactions, and optimization.",
    icon: "Database",
    tagColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    glowColor: "rgba(56, 189, 248, 0.25)",
  },
  {
    name: "Oracle SQL",
    category: "database",
    level: "Proficient",
    description: "Enterprise relational database management, PL/SQL stored procedures, and high-volume data handling.",
    icon: "HardDrive",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },

  // DevOps & Infrastructure
  {
    name: "Docker & Containers",
    category: "devops",
    level: "Advanced",
    description: "Multi-stage Dockerfiles, image minimization, security hardening, and container lifecycle management.",
    icon: "Boxes",
    tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    glowColor: "rgba(6, 182, 212, 0.25)",
  },
  {
    name: "Docker Swarm",
    category: "devops",
    level: "Proficient",
    description: "Cluster management, service scaling, rolling updates, overlay networks, and production failover.",
    icon: "Share2",
    tagColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    glowColor: "rgba(99, 102, 241, 0.25)",
  },
  {
    name: "Linux & VM Management",
    category: "devops",
    level: "Advanced",
    description: "Linux server administration, shell scripting, systemd service management, resource limits, and VM provisioning.",
    icon: "Terminal",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
  {
    name: "Nginx",
    category: "devops",
    level: "Advanced",
    description: "Reverse proxying, SSL termination, load balancing, rate limiting, and caching configuration.",
    icon: "ShieldCheck",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },

  // Monitoring
  {
    name: "Grafana & Prometheus",
    category: "monitoring",
    level: "Proficient",
    description: "Telemetry metric collection, time-series dashboards, alert manager rules, and real-time system observability.",
    icon: "Gauge",
    tagColor: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    glowColor: "rgba(249, 115, 22, 0.25)",
  },
  {
    name: "Git & GitLab CI/CD",
    category: "tools",
    level: "Advanced",
    description: "Version control workflows, branching strategies, automated pipeline integration, and release tagging.",
    icon: "GitBranch",
    tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    glowColor: "rgba(244, 63, 94, 0.25)",
  },
];

export const EXPERIENCE: ExperienceItem = {
  role: "Software Engineer",
  company: "Celloscope Limited",
  companyUrl: "https://celloscope.net",
  location: "Dhaka, Bangladesh",
  period: "Sep 2023 — Present",
  status: "Current",
  summary:
    "Developing scalable enterprise web applications, engineering high-performance RESTful APIs, managing production database systems, and orchestrating containerized DevOps infrastructure with proactive monitoring.",
  responsibilities: [
    "Design, develop, and maintain high-concurrency RESTful APIs and backend microservices using Node.js, NestJS, and Hapi.js.",
    "Architect responsive and accessible frontend applications utilizing Angular, React, Next.js, and modern TypeScript workflows.",
    "Optimize relational database performance, index structures, query execution plans, and transaction integrity across PostgreSQL and Oracle databases.",
    "Containerize services and orchestrate multi-node deployments with Docker, Docker Swarm, and automated deployment scripts on Linux production servers.",
    "Configure Nginx reverse proxies, SSL/TLS certificate automation, load balancing, and traffic routing for enterprise clients.",
    "Set up end-to-end monitoring and observability pipelines utilizing Prometheus and Grafana dashboards for rapid incident mitigation.",
    "Diagnose and resolve critical production issues, minimizing downtime and ensuring system resilience under high transaction loads.",
  ],
  technologies: [
    "Node.js",
    "NestJS",
    "Next.js",
    "React",
    "Angular",
    "TypeScript",
    "PostgreSQL",
    "Oracle SQL",
    "Docker",
    "Docker Swarm",
    "Linux",
    "Nginx",
    "Grafana",
    "Prometheus",
    "GitLab",
  ],
  metrics: [
    { label: "Deployment Reliability", value: "99.9%" },
    { label: "Architecture", value: "Microservices" },
    { label: "Core Stack", value: "Node & TypeScript" },
    { label: "Infra Mode", value: "Docker Swarm" },
  ],
};

export const EDUCATION: EducationItem[] = [
  {
    degree: "BSc Engineering in Electronics & Communication Engineering (ECE)",
    institution: "Khulna University",
    period: "2018 — 2023",
    field: "Engineering, Systems, Signal Processing & Computing",
    highlights: [
      "Rigorous foundation in computer networks, telecommunications, algorithms, and digital system design.",
      "Hands-on problem solving, hardware-software integration, and collaborative engineering projects.",
    ],
  },
  {
    degree: "Higher Secondary Certificate (HSC) — Science",
    institution: "Govt. M.M College",
    period: "2015 — 2017",
    field: "Science & Mathematics",
    highlights: [
      "Concentration in Higher Mathematics, Physics, and Information Technology.",
    ],
  },
];

export const ARCHITECTURE_FLOW = [
  {
    step: "01",
    title: "Client & Ingress",
    subtitle: "Web, Mobile & API Clients",
    desc: "Next.js / Angular client requests route through DNS to reverse proxies.",
    tech: ["Next.js", "Angular", "HTTP/2", "SSL/TLS"],
  },
  {
    step: "02",
    title: "Edge & Reverse Proxy",
    subtitle: "Nginx Load Balancer",
    desc: "Traffic routing, rate limiting, static asset caching, and security header enforcement.",
    tech: ["Nginx", "Linux VMs", "UFW Firewall"],
  },
  {
    step: "03",
    title: "Microservices & Logic",
    subtitle: "Node.js / NestJS Services",
    desc: "Stateless containerized service instances with RBAC, validation, and business logic.",
    tech: ["Node.js", "NestJS", "Express/Hapi", "REST APIs"],
  },
  {
    step: "04",
    title: "Persistence & Data",
    subtitle: "PostgreSQL & Oracle",
    desc: "Relational storage, optimized indexing, transaction isolation, and query efficiency.",
    tech: ["PostgreSQL", "Oracle SQL", "Connection Pools"],
  },
  {
    step: "05",
    title: "Observability & CI/CD",
    subtitle: "Telemetry & Deployment",
    desc: "Automated Docker Swarm pipelines, Prometheus metric scraping, and Grafana telemetry.",
    tech: ["Docker Swarm", "Prometheus", "Grafana", "GitLab CI"],
  },
];
