"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();

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

  if (allowedPaths.includes(pathname)) {
    return <Navbar />;
  }

  return null;
};

export default ConditionalNavbar;
