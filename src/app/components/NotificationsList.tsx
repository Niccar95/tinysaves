"use client";
import React from "react";
import { handleReceivedFriendRequest } from "@/services/userService";
import { Notification } from "../contexts/NotificationsContext";

interface NotificationsListProps {
  notifications: Notification[];
  closeMenu?: () => void;
}

const NotificationsList = ({
  notifications,
  closeMenu,
}: NotificationsListProps) => {
  const handleFriendRequest = async (
    userChoice: string,
    notificationId: string
  ) => {
    try {
      await handleReceivedFriendRequest(userChoice, notificationId);
    } catch (error) {
      console.error("Failed to handle friend request", error);
    }
  };

  if (notifications.length === 0) return <p>No notifications</p>;

  return (
    <ul className="notificationsList">
      {notifications.map((notification) => (
        <li key={notification.notificationId} className="notification">
          <p className="notificationMessage">{notification.message}</p>
          <div className="notificationActions">
            {notification.status === "pending" ? (
              <>
                <button
                  className="actionButton small"
                  onClick={() => {
                    closeMenu?.();
                    handleFriendRequest(
                      "accepted",
                      notification.notificationId
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  className="actionButton small declineButton"
                  onClick={() => {
                    closeMenu?.();
                    handleFriendRequest(
                      "declined",
                      notification.notificationId
                    );
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
