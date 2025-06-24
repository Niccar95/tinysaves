"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { useClickOutside } from "../hooks/useClickOutside";
import { useTranslations } from "next-intl";
import ConditionalHeader from "./ConditionalHeader";

const Navbar = () => {
  const [isNavClicked, setIsNavClicked] = useState<boolean>(false);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const t = useTranslations("pages");

  const windowCheckRef = useRef<boolean>(false);
  const [windowCheck, setwindowCheck] = useState<boolean>(false);

  const actionsMenuRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => {
      if (!windowCheck) {
        setIsSidebarOpen(false);
        setIsNavClicked(false);
      }
    },
  });

  const burgerClass = isNavClicked
    ? "burgerBar clicked"
    : "burgerBar unclicked";

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });

    localStorage.removeItem("messagesVisible");
  };

  const updateNavBar = () => {
    setIsNavClicked(!isNavClicked);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeNavBar = () => {
    setIsNavClicked(false);
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1200;
    setwindowCheck(isDesktop);
    windowCheckRef.current = isDesktop;
    setIsSidebarOpen(isDesktop);
  }, [setIsSidebarOpen]);

  return (
    <ConditionalHeader>
      <div
        className="burgerContainer"
        ref={actionsMenuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hamburgerMenu" onClick={updateNavBar}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </div>

      <nav className={`navBar ${isSidebarOpen ? "visible" : "hidden"}`}>
        <div className="sidebarToggleContainer">
          <button
            className="sidebarToggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i
              className={`bi bi-caret-right-fill ${
                isSidebarOpen ? "rotate" : ""
              }`}
            ></i>
          </button>
        </div>
        <ul>
          <li>
            <Link className="navLink" href="/dashboard" onClick={closeNavBar}>
              <i className="bi bi-house-door-fill"></i>
              {t("dashboard")}
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/goals" onClick={closeNavBar}>
              <i className="bi bi-piggy-bank-fill"></i>
              {t("myGoals")}
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/milestones" onClick={closeNavBar}>
              <i className="bi bi-trophy-fill"></i>
              {t("myMilestones")}
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/stats" onClick={closeNavBar}>
              <i className="bi bi-bar-chart-line-fill"></i>
              {t("myStats")}
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/profile" onClick={closeNavBar}>
              <i className="bi bi-person-circle"></i>
              {t("myProfile")}
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/settings" onClick={closeNavBar}>
              <i className="bi bi-gear-fill"></i>
              {t("settings")}
            </Link>
          </li>
        </ul>
        <section className="logoutButtonSection">
          <button className="logoutButton" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"></i>
            {t("logOut")}
          </button>
        </section>
      </nav>
    </ConditionalHeader>
  );
};

export default Navbar;
