"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./../styles/globals.scss";
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
            <Image src={logo} alt="icon" height="100" width="100"></Image>
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
