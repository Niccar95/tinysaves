"use client";
import React, { useState } from "react";

interface ThemeProps {
  currentTheme: string | undefined;
}

const ThemeToggle = ({ currentTheme }: ThemeProps) => {
  const [theme, setTheme] = useState<string | undefined>(currentTheme);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDark = e.target.checked;
    const newTheme = isDark ? "dark" : "light";

    document.documentElement.classList.toggle("dark", isDark);

    setTheme(newTheme);
  };

  console.log("Theme changed to:", theme);

  return (
    <div className="switchContainer">
      <i className="bi bi-sun"></i>
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <i className="bi bi-moon-fill"></i>
    </div>
  );
};

export default ThemeToggle;
