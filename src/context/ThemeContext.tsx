"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Read stored theme from localStorage or document class
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Default to dark mode
      document.documentElement.classList.add("dark");
    }
    setIsLoaded(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    const applyThemeChange = () => {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
      if (typeof window !== "undefined") {
        if (newTheme === "dark") {
          window.document.documentElement.classList.add("dark");
        } else {
          window.document.documentElement.classList.remove("dark");
        }
      }
    };

    if (typeof window !== "undefined") {
      const doc = window.document as Document & {
        startViewTransition?: (callback: () => void) => void;
      };

      if (typeof doc.startViewTransition === "function") {
        doc.startViewTransition(() => {
          flushSync(() => {
            applyThemeChange();
          });
        });
      } else {
        doc.documentElement.classList.add("theme-transition");
        flushSync(() => {
          applyThemeChange();
        });
        setTimeout(() => {
          doc.documentElement.classList.remove("theme-transition");
        }, 300);
      }
    } else {
      applyThemeChange();
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
