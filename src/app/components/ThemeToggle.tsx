"use client";
import React from "react";

const ThemeToggle = () => {
  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    document.documentElement.classList.toggle("dark", checked);
  };

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
