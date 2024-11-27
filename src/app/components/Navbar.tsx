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
      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/myGoals">My goals</Link>
        <Link href="/myBadges">My badges</Link>
        <Link href="/myStats">My stats</Link>
        <Link href="/myProfile">My profile</Link>
        <button onClick={handleLogout}>Log out</button>
      </nav>
    </>
  );
};

export default Navbar;
