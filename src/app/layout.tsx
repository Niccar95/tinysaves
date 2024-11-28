"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./../styles/globals.scss";

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
          {pathname !== "/" && pathname !== "/registration" && (
            <Navbar></Navbar>
          )}
          <main>{children}</main>
          <footer></footer>
        </SessionProvider>
      </body>
    </html>
  );
}
