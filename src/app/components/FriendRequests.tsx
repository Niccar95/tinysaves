"use client";

import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NotificationsContext } from "../contexts/NotificationsContext";

const FriendRequests = () => {
  const { notifications } = useContext(NotificationsContext);
  const latestNotificationRef = useRef<string | null>(null);
  const hasBeenShown = useRef(false);

  useEffect(() => {
    const friendRequests = notifications.filter(
      (notification) => notification.type === "friend_request"
    );

    if (friendRequests.length === 0) return;

    const latestNotification = friendRequests[0];

    if (!hasBeenShown.current) {
      latestNotificationRef.current = latestNotification.notificationId;
      hasBeenShown.current = true;
      return;
    }

    if (latestNotification.notificationId !== latestNotificationRef.current) {
      latestNotificationRef.current = latestNotification.notificationId;

      toast.info(latestNotification.message);
    }
  }, [notifications]);

  return null;
};

export default FriendRequests;
