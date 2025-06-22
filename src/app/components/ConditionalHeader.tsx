"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "/public/logo.svg";
import LanguageMenu from "./LanguageMenu";
import { useState } from "react";
import { useLocale } from "next-intl";

const ConditionalHeader = () => {
  const locale = useLocale();
  const [openLangMenu, setOpenLangMenu] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>(locale);
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/registration" ||
    pathname === "/resetPassword"
  ) {
    return null;
  }

  return (
    <header>
      <Image className="logo" src={logo} alt="icon"></Image>
      <button
        className="langMenuButton"
        onClick={() => {
          setOpenLangMenu(!openLangMenu);
        }}
      >
        {currentLang == "en" && (
          <Image src={"/en.svg"} width={20} height={20} alt="en"></Image>
        )}
        {currentLang == "sv" && (
          <Image src={"/sv.svg"} width={20} height={20} alt="sv"></Image>
        )}
        {currentLang == "es" && (
          <Image src={"/es.svg"} width={20} height={20} alt="es"></Image>
        )}
        {currentLang.toUpperCase()}
        <i
          className={`bi bi-caret-down-fill ${openLangMenu ? "rotate" : ""}`}
        ></i>
      </button>

      {openLangMenu && (
        <LanguageMenu
          setCurrentLang={setCurrentLang}
          closeMenu={() => setOpenLangMenu(false)}
        />
      )}
    </header>
  );
};

export default ConditionalHeader;
