import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role} @ ${PERSONAL_INFO.company}`,
  description: `${PERSONAL_INFO.bio} Specialized in Node.js, Next.js, PostgreSQL, Docker, and DevOps practices.`,
  keywords: [
    "Nahid Karim Ankur",
    "Software Engineer",
    "Celloscope Limited",
    "Node.js",
    "Next.js",
    "NestJS",
    "React",
    "Angular",
    "PostgreSQL",
    "Oracle SQL",
    "Docker",
    "Docker Swarm",
    "Linux",
    "Nginx",
    "DevOps",
    "Grafana",
    "Prometheus",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.portfolio }],
  openGraph: {
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.bio,
    url: PERSONAL_INFO.portfolio,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-cyan-500/30">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
