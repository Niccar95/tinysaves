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
          <ul className="notificationList">
            {notifications.map((notification, i) => (
              <li className="notification" key={i}>
                <p className="notificationMessage">{notification.message}</p>

                <div className="notificationActions">
                  <button className="actionButton small">
                    <i className="bi bi-check-circle-fill"></i>
                    Accept
                  </button>
                  <button className="actionButton small declineButton">
                    <i className="bi bi-x-circle-fill"></i>
                    Decline
                  </button>
                </div>
              </li>
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
