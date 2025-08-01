"use client";

import { useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [trackedTheme, setTrackedTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("userTheme");
    if (storedTheme) {
      setTrackedTheme(JSON.parse(storedTheme));
    } else {
      setTrackedTheme("light");
    }
  }, []);

  if (!trackedTheme) return null;

  return (
    <ThemeContext.Provider value={{ trackedTheme, setTrackedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
