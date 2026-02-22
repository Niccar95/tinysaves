"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import logoLightMode from "/public/logo-lightMode.svg";
import logoDarkMode from "/public/logo-darkMode.svg";

const FooterLogo = () => {
  const { trackedTheme } = useContext(ThemeContext);

  return (
    <>
      {trackedTheme === "light" && (
        <Image
          className="footerLogoImg"
          src={logoLightMode}
          alt="TinySaves logo"
          width={52}
          height={52}
        />
      )}
      {trackedTheme === "dark" && (
        <Image
          className="footerLogoImg"
          src={logoDarkMode}
          alt="TinySaves logo"
          width={52}
          height={52}
        />
      )}
    </>
  );
};

export default FooterLogo;
