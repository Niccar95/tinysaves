"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import logo from "../../public/logo.svg";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <header>
            <Image className="logo" src={logo} alt="icon"></Image>
          </header>
          <main>
            {pathname !== "/" && pathname !== "/registration" && (
              <Navbar></Navbar>
            )}
            {children}
          </main>
          <footer></footer>
        </SessionProvider>
      </body>
    </html>
  );
}
