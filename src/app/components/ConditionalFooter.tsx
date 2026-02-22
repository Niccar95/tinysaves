"use client";

import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const ConditionalFooter = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <footer className={!isSidebarOpen ? "fullWidth" : ""}>
      {children}
    </footer>
  );
};

export default ConditionalFooter;
