"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./../styles/globals.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { GoalsContext } from "./contexts/GoalsContext";
import { useState } from "react";
import { Goals } from "@prisma/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [goals, setGoals] = useState<Goals[]>([]);
  const [singleGoal, setSingleGoal] = useState<Goals | null>(null);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GoalsContext.Provider
            value={{ goals, setGoals, singleGoal, setSingleGoal }}
          >
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
          </GoalsContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
