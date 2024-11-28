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
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/goals">My goals</Link>
          </li>
          <li>
            <Link href="/badges">My badges</Link>
          </li>
          <li>
            <Link href="/stats">My stats</Link>
          </li>
          <li>
            <Link href="/profile">My profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Log out</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
