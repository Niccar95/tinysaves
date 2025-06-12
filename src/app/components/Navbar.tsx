"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const Navbar = () => {
  const [isNavClicked, setIsNavClicked] = useState<boolean>(false);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

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
    setIsSidebarOpen(isDesktop);
  }, [setIsSidebarOpen]);

  return (
    <>
      <section className="hamburgerSection">
        <div className="hamburgerMenu" onClick={updateNavBar}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </section>
      <nav className={`navBar ${isSidebarOpen ? "visible" : "hidden"}`}>
        <div className="sidebarToggleContainer">
          <button
            className="sidebarToggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </div>
        <ul>
          <li>
            <Link className="navLink" href="/dashboard" onClick={closeNavBar}>
              <i className="bi bi-house-door-fill"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/goals" onClick={closeNavBar}>
              <i className="bi bi-piggy-bank-fill"></i>
              My goals
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/milestones" onClick={closeNavBar}>
              <i className="bi bi-trophy-fill"></i>
              My milestones
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/stats" onClick={closeNavBar}>
              <i className="bi bi-bar-chart-line-fill"></i>
              My stats
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/profile" onClick={closeNavBar}>
              <i className="bi bi-person-circle"></i>
              My profile
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/settings" onClick={closeNavBar}>
              <i className="bi bi-gear-fill"></i>
              Settings
            </Link>
          </li>
        </ul>
        <section className="logoutButtonSection">
          <button className="logoutButton" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"></i>
            Log out
          </button>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
