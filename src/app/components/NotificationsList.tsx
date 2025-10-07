"use client";
import React from "react";
import { handleReceivedFriendRequest } from "@/services/userService";
import { Notification } from "../contexts/NotificationsContext";

interface NotificationsListProps {
  notifications: Notification[];
  setNotifications?: (
    notifications: Notification[] | ((prev: Notification[]) => Notification[])
  ) => void;
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
    notificationId: string
  ) => {
    try {
      await handleReceivedFriendRequest(userChoice, notificationId);

      if (setNotifications) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.notificationId === notificationId
              ? { ...n, status: userChoice }
              : n
          )
        );
      }
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
            {notification.type === "friend_request" &&
            (!notification.status || notification.status === "pending") ? (
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
            ) : notification.type === "friend_request" &&
              (notification.status === "accepted" ||
                notification.status === "declined") ? (
              <span className="notificationStatus">
                {notification.status === "accepted"
                  ? "✅ Accepted"
                  : "❌ Declined"}
              </span>
            ) : notification.type === "friend_request_response" ? (
              <span className="notificationStatus">
                {notification.status === "accepted" ||
                notification.message.includes("accepted")
                  ? "✅ Accepted"
                  : "❌ Declined"}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotificationsList;
