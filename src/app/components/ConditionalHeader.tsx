"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logoLightMode from "/public/logo-lightMode.svg";
import logoDarkMode from "/public/logo-darkMode.svg";
import LanguageMenu from "./LanguageMenu";
import { useContext, useState } from "react";
import { useLocale } from "next-intl";
import { useClickOutside } from "../hooks/useClickOutside";
import { ThemeContext } from "../contexts/ThemeContext";

const ConditionalHeader = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();
  const { trackedTheme } = useContext(ThemeContext);

  const [openLangMenu, setOpenLangMenu] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>(locale);
  const pathname = usePathname();

  const actionsMenuRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setOpenLangMenu(false),
  });

  const allowedPaths = [
    "/dashboard",
    "/goals",
    "/milestones",
    "/stats",
    "/profile",
    "/profile/edit",
    "/settings",
  ];

  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  return (
    <header>
      {trackedTheme === "light" && (
        <Image className="logo" src={logoLightMode} alt="icon"></Image>
      )}

      {trackedTheme === "dark" && (
        <Image className="logo" src={logoDarkMode} alt="icon"></Image>
      )}

      <div ref={actionsMenuRef} onClick={(e) => e.stopPropagation()}>
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

        <LanguageMenu
          className={openLangMenu ? "visible" : ""}
          setCurrentLang={setCurrentLang}
          closeMenu={() => setOpenLangMenu(false)}
        />
      </div>
      {children}
    </header>
  );
};

export default ConditionalHeader;
