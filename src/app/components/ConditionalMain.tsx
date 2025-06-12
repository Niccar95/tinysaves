"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const ConditionalMain = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  const pathname = usePathname();
  const AuthPage =
    pathname === "/" ||
    pathname === "/registration" ||
    pathname === "/resetPassword";

  return (
    <main
      className={`${AuthPage ? "authMain" : ""} ${
        !isSidebarOpen ? "fullWidth" : ""
      }`}
    >
      {children}
    </main>
  );
};

export default ConditionalMain;
