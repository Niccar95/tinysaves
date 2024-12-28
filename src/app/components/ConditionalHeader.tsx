"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "/public/logo.svg";

const ConditionalHeader = () => {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/registration" ||
    pathname === "/resetPassword"
  ) {
    return null;
  }

  return (
    <header>
      <Image className="logo" src={logo} alt="icon"></Image>
    </header>
  );
};

export default ConditionalHeader;
