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
        {requests.length > 0 ? (
          <ul>
            {requests.map((req, id) => (
              <li key={id}>Pending friend request from {req.from}</li>
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
