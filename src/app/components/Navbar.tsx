"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [burgerClass, setBurgerClass] = useState("burgerBar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burgerBar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burgerBar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const closeMenu = () => {
    setBurgerClass("burgerBar unclicked");
    setMenuClass("menu hidden");
    setIsMenuClicked(false);
  };

  return (
    <>
      <section className="hamburgerSection">
        <div className="hamburgerMenu" onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </section>
      <nav className={menuClass}>
        <ul>
          <li>
            <Link className="navLink" href="/dashboard" onClick={closeMenu}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/goals" onClick={closeMenu}>
              My goals
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/badges" onClick={closeMenu}>
              My badges
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/stats" onClick={closeMenu}>
              My stats
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/profile" onClick={closeMenu}>
              My profile
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
