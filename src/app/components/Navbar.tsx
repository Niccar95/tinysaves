"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <nav className="sidebar">
        <ul>
          <li>
            <Link className="navLink" href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/goals">
              My goals
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/badges">
              My badges
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/stats">
              My stats
            </Link>
          </li>
          <li>
            <Link className="navLink" href="/profile">
              My profile
            </Link>
          </li>
        </ul>
        <div>
          <button className="logoutButton" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
