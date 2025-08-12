"use client";
import React from "react";

interface LangMenuProps {
  closeMenu: () => void;
  className?: string;
}

const NotificationsMenu = ({ className }: LangMenuProps) => {
  return (
    <>
      <section
        className={`actionsMenu headerMenu notificationsMenu ${className} `}
      >
        <p>No notifications</p>
      </section>
    </>
  );
};

export default NotificationsMenu;
