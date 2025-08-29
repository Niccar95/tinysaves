"use client";
import React, { useContext } from "react";
import { NotificationsContext } from "../contexts/NotificationsContext";
import NotificationsList from "./NotificationsList";
import Link from "next/link";

interface LangMenuProps {
  closeMenu: () => void;
  className?: string;
}

const NotificationsMenu = ({ closeMenu, className }: LangMenuProps) => {
  const { notifications } = useContext(NotificationsContext);

  const displayedNotifications = notifications.slice(0, 3);

  return (
    <section
      className={`actionsMenu headerMenu notificationsMenu ${className} menuMaxHeight`}
    >
      <NotificationsList
        notifications={displayedNotifications}
        closeMenu={closeMenu}
      />
      <Link href="/notifications">Show all notifications</Link>
    </section>
  );
};

export default NotificationsMenu;
