"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "/public/logo.svg";
import LanguageMenu from "./LanguageMenu";
import { useState } from "react";

const ConditionalHeader = () => {
  const [openLangMenu, setOpenLangMenu] = useState<boolean>(false);
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
      <button
        className="langMenuButton"
        onClick={() => {
          setOpenLangMenu(!openLangMenu);
        }}
      >
        Lang
      </button>

      {openLangMenu && (
        <LanguageMenu closeMenu={() => setOpenLangMenu(false)} />
      )}
    </header>
  );
};

export default ConditionalHeader;
