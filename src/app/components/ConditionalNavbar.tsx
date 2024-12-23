"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/registration" ||
    pathname === "/resetPassword"
  ) {
    return null;
  }
  return <Navbar />;
};

export default ConditionalNavbar;
