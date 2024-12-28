"use client";

import { usePathname } from "next/navigation";

const ConditionalMain = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const AuthPage =
    pathname === "/" ||
    pathname === "/registration" ||
    pathname === "/resetPassword";

  return <main className={AuthPage ? "authMain" : ""}>{children}</main>;
};

export default ConditionalMain;
