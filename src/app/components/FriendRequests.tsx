"use client";

import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NotificationsContext } from "../contexts/NotificationsContext";

const FriendRequests = () => {
  const { notifications } = useContext(NotificationsContext);
  const latestNotificationRef = useRef<string | null>(null);

  useEffect(() => {
    if (notifications.length === 0) return;

    const latestNotification = notifications[notifications.length - 1];

    if (latestNotification.notificationId !== latestNotificationRef.current) {
      latestNotificationRef.current = latestNotification.notificationId;

      if (latestNotification.type === "friend-request") {
        toast.info(`New friend request from ${latestNotification.fromUserId}`);
      }
    }
  }, [notifications]);

  return null;
};

export default FriendRequests;
