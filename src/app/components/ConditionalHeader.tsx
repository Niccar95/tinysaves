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
import NotificationsMenu from "./NotificationsMenu";
import { NotificationsContext } from "../contexts/NotificationsContext";

const ConditionalHeader = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();
  const { trackedTheme } = useContext(ThemeContext);
  const { notifications } = useContext(NotificationsContext);

  const [openLangMenu, setOpenLangMenu] = useState<boolean>(false);
  const [openNotificationsMenu, setOpenNotificationsMenu] =
    useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>(locale);
  const pathname = usePathname();

  const langMenuRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setOpenLangMenu(false),
  });
  const notificationsMenuRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setOpenNotificationsMenu(false),
  });

  const allowedPaths = [
    "/dashboard",
    "/goals",
    "/milestones",
    "/stats",
    "/profile",
    "/profile/edit",
    "/settings",
    "/notifications",
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

      <nav className="headerNavBar">
        <div ref={notificationsMenuRef} onClick={(e) => e.stopPropagation()}>
          <button
            className="notificationsButton"
            onClick={() => {
              setOpenNotificationsMenu(!openNotificationsMenu);
            }}
          >
            <i className="bi bi-bell-fill">
              {notifications.length > 0 && (
                <span className="notificationsCounter">
                  {notifications.length}
                </span>
              )}
            </i>
          </button>

          <NotificationsMenu
            className={openNotificationsMenu ? "visible" : ""}
            closeMenu={() => setOpenNotificationsMenu(false)}
          />
        </div>

        <div ref={langMenuRef} onClick={(e) => e.stopPropagation()}>
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
              className={`bi bi-caret-down-fill ${
                openLangMenu ? "rotate" : ""
              }`}
            ></i>
          </button>

          <LanguageMenu
            className={openLangMenu ? "visible" : ""}
            setCurrentLang={setCurrentLang}
            closeMenu={() => setOpenLangMenu(false)}
          />
        </div>
      </nav>
      {children}
    </header>
  );
};

export default ConditionalHeader;
