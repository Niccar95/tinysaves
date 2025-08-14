"use client";
import React, { useContext } from "react";
import { NotificationsContext } from "../contexts/NotificationsContext";
import Link from "next/link";
interface LangMenuProps {
  closeMenu: () => void;
  className?: string;
}

const NotificationsMenu = ({ closeMenu, className }: LangMenuProps) => {
  const { notifications } = useContext(NotificationsContext);

  return (
    <>
      <section
        className={`actionsMenu headerMenu notificationsMenu ${className} menuMaxHeight`}
      >
        {notifications.length > 0 ? (
          <>
            <ul className="notificationsList">
              {notifications.slice(0, 3).map((notification, i) => (
                <li className="notification" key={i}>
                  <p className="notificationMessage">{notification.message}</p>
                  <div className="notificationActions">
                    <button className="actionButton small" onClick={closeMenu}>
                      <i className="bi bi-check-circle-fill"></i>
                      Accept
                    </button>
                    <button
                      className="actionButton small declineButton"
                      onClick={closeMenu}
                    >
                      <i className="bi bi-x-circle-fill"></i>
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {notifications.length > 3 && (
              <Link href="/notifications">Show all notifications</Link>
            )}
          </>
        ) : (
          <p>No notifications</p>
        )}
      </section>
    </>
  );
};

export default NotificationsMenu;
