"use client";
import React, { useContext, useState } from "react";
import { NotificationsContext } from "../contexts/NotificationsContext";
import Link from "next/link";
import { handleReceivedFriendRequest } from "@/services/userService";

interface LangMenuProps {
  closeMenu: () => void;
  className?: string;
}

const NotificationsMenu = ({ closeMenu, className }: LangMenuProps) => {
  const { notifications } = useContext(NotificationsContext);
  const [choices, setChoices] = useState<{ [key: string]: string }>({});

  const handleFriendRequest = (userChoice: string, notificationId: string) => {
    setChoices({ ...choices, [notificationId]: userChoice });
    try {
      handleReceivedFriendRequest(userChoice, notificationId);
    } catch (error) {
      console.log("Failed to handle friend request", error);
    }
  };

  return (
    <>
      <section
        className={`actionsMenu headerMenu notificationsMenu ${className} menuMaxHeight`}
      >
        {notifications.length > 0 ? (
          <>
            <ul className="notificationsList">
              {notifications.slice(0, 3).map((notification) => (
                <li className="notification" key={notification.notificationId}>
                  <p className="notificationMessage">{notification.message}</p>
                  <div className="notificationActions">
                    {!choices[notification.notificationId] ? (
                      <>
                        <button
                          className="actionButton small"
                          onClick={() => {
                            closeMenu();
                            handleFriendRequest(
                              "accepted",
                              notification.notificationId
                            );
                          }}
                        >
                          <i className="bi bi-check-circle-fill"></i>
                          Accept
                        </button>

                        <button
                          className="actionButton small declineButton"
                          onClick={() => {
                            closeMenu();
                            handleFriendRequest(
                              "declined",
                              notification.notificationId
                            );
                          }}
                        >
                          <i className="bi bi-x-circle-fill"></i>
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="notificationStatus">
                        {choices[notification.notificationId] === "accepted" ? (
                          <>
                            <i className="bi bi-check-circle-fill"></i> Accepted
                          </>
                        ) : (
                          <>
                            <i className="bi bi-x-circle-fill"></i> Declined
                          </>
                        )}
                      </span>
                    )}
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
