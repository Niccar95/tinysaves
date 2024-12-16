"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [burgerClass, setBurgerClass] = useState("burgerBar unclicked");
  const [navClass, setNavClass] = useState("navBar hidden");
  const [isNavClicked, setIsNavClicked] = useState(false);
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });

    localStorage.removeItem("messagesVisible");
  };

  const updateNavBar = () => {
    if (!isNavClicked) {
      setBurgerClass("burgerBar clicked");
      setNavClass("navBar visible");
    } else {
      setBurgerClass("burgerBar unclicked");
      setNavClass("navBar hidden");
    }
    setIsNavClicked(!isNavClicked);
  };

  const closeNavBar = () => {
    setBurgerClass("burgerBar unclicked");
    setNavClass("navBar hidden");
    setIsNavClicked(false);
  };

  return (
    <>
      <section className="hamburgerSection">
        <div className="hamburgerMenu" onClick={updateNavBar}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </section>
      <nav className={navClass}>
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
            <Link className="navLink" href="/badges" onClick={closeNavBar}>
              <i className="bi bi-trophy-fill"></i>
              My badges
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
