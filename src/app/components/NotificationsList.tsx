"use client";
import React from "react";
import { handleReceivedFriendRequest } from "@/services/userService";
import { Notification } from "../contexts/NotificationsContext";

interface NotificationsListProps {
  notifications: Notification[];
  setNotifications?: (notifications: Notification[]) => void;
  closeMenu?: () => void;
}

const NotificationsList = ({
  notifications,
  setNotifications,
  closeMenu,
}: NotificationsListProps) => {
  if (notifications.length === 0) return <p>No notifications</p>;

  const handleFriendRequest = async (
    userChoice: string,
    notification: Notification
  ) => {
    try {
      await handleReceivedFriendRequest(
        userChoice,
        notification.notificationId
      );

      notification.status = userChoice;
      setNotifications?.([...notifications]);
    } catch (error) {
      console.error("Failed to handle friend request", error);
    }
  };

  return (
    <ul className="notificationsList">
      {notifications.map((notification) => (
        <li key={notification.notificationId} className="notification">
          <p className="notificationMessage">{notification.message}</p>
          <div className="notificationActions">
            {!notification.status || notification.status === "pending" ? (
              <>
                <button
                  className="actionButton small"
                  onClick={() => {
                    closeMenu?.();
                    handleFriendRequest("accepted", notification);
                  }}
                >
                  Accept
                </button>
                <button
                  className="actionButton small declineButton"
                  onClick={() => {
                    closeMenu?.();
                    handleFriendRequest("declined", notification);
                  }}
                >
                  Decline
                </button>
              </>
            ) : (
              <span className="notificationStatus">
                {notification.status === "accepted"
                  ? "✅ Accepted"
                  : "❌ Declined"}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationsList;
