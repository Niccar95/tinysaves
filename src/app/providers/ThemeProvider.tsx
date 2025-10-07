"use client";

import { useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useSession } from "next-auth/react";

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: string;
}) => {
  const [trackedTheme, setTrackedTheme] = useState<string>(initialTheme);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserTheme = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const response = await fetch("/api/settings");
          if (response.ok) {
            const data = await response.json();
            const userTheme = data.userSettings?.theme || "light";
            setTrackedTheme(userTheme);
          }
        } catch (error) {
          console.error("Failed to fetch user theme", error);
        }
      } else if (status === "unauthenticated") {
        setTrackedTheme("light");
      }
    };

    fetchUserTheme();
  }, [session?.user?.id, status]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", trackedTheme === "dark");
  }, [trackedTheme]);

  return (
    <ThemeContext.Provider value={{ trackedTheme, setTrackedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
