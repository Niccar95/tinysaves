"use client";
import { changeTheme } from "@/services/authService";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface ThemeProps {
  currentTheme: string | undefined;
}

const ThemeToggle = ({ currentTheme }: ThemeProps) => {
  const [theme, setTheme] = useState<string | undefined>(currentTheme);

  const { setTrackedTheme } = useContext(ThemeContext);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDark = e.target.checked;
    const newTheme = isDark ? "dark" : "light";

    setTheme(newTheme);
    changeTheme(newTheme);
    setTrackedTheme(newTheme);
  };

  return (
    <div className="switchContainer">
      <i className="bi bi-sun"></i>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
      <i className="bi bi-moon-fill"></i>
    </div>
  );
};

export default ThemeToggle;
