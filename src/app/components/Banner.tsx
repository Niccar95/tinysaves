"use client";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Image from "next/image";
import bannerLightMode from "/public/banner-lightMode.svg";
import bannerDarkMode from "/public/banner-darkMode.svg";

const Banner = () => {
  const { trackedTheme } = useContext(ThemeContext);

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("userTheme") || "null");
    if (storedTheme) {
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  return (
    <div className="bannerWrapper">
      {trackedTheme === "light" && (
        <Image
          className="banner"
          src={bannerLightMode}
          alt="banner"
          fill
          priority
        ></Image>
      )}
      {trackedTheme === "dark" && (
        <Image
          className="banner"
          src={bannerDarkMode}
          alt="banner"
          fill
          priority
        ></Image>
      )}
    </div>
  );
};

export default Banner;
