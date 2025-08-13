"use client";
import React, { useContext } from "react";
import { NotificationsContext } from "../contexts/NotificationsContext";
interface LangMenuProps {
  closeMenu: () => void;
  className?: string;
}

const NotificationsMenu = ({ className }: LangMenuProps) => {
  const { notifications } = useContext(NotificationsContext);

  return (
    <>
      <section
        className={`actionsMenu headerMenu notificationsMenu ${className} `}
      >
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, i) => (
              <li key={i}>{notification.message}</li>
            ))}
          </ul>
        ) : (
          <p>No notifications</p>
        )}
      </section>
    </>
  );
};

export default NotificationsMenu;
