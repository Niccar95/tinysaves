"use client";

import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NotificationsContext } from "../contexts/NotificationsContext";

const FriendRequests = () => {
  const { notifications } = useContext(NotificationsContext);
  const latestRef = useRef<string | null>(null);

  useEffect(() => {
    const friendRequests = notifications.filter(
      (n) => n.type === "friend_request" || n.type === "friend_request_response"
    );
    if (!friendRequests.length) return;

    const latest = friendRequests[0];

    // Skip first render
    if (!latestRef.current) {
      latestRef.current = latest.notificationId;
      return;
    }

    // New request
    if (latest.notificationId !== latestRef.current) {
      latestRef.current = latest.notificationId;
      toast.info(latest.message);
    }

    // Status change
    if (latest.status && latest.status !== "pending") {
      toast.info(
        `Friend request from ${latest.fromUserId} ${
          latest.status === "accepted" ? "accepted ✅" : "declined ❌"
        }`
      );
    }
  }, [notifications]);

  return null;
};

export default FriendRequests;
