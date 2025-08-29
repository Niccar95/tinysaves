"use client";

import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NotificationsContext } from "../contexts/NotificationsContext";

const FriendRequests = () => {
  const { notifications } = useContext(NotificationsContext);
  const latestNotificationRef = useRef<string | null>(null);

  useEffect(() => {
    const friendRequests = notifications.filter(
      (notification) => notification.type === "friend_request"
    );
    if (friendRequests.length === 0) return;

    const latestNotification = friendRequests[0];

    if (latestNotification.notificationId !== latestNotificationRef.current) {
      latestNotificationRef.current = latestNotification.notificationId;
      toast.info(`New friend request from ${latestNotification.fromUserId}`);
    }
  }, [notifications]);

  return null;
};

export default FriendRequests;
