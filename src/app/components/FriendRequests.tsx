"use client";

import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NotificationsContext } from "../contexts/NotificationsContext";
import { useSession } from "next-auth/react";

const FriendRequests = () => {
  const { notifications } = useContext(NotificationsContext);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const latestRequestRef = useRef<string | null>(null);
  const latestResponseRef = useRef<string | null>(null);

  // To handle new friend requests
  useEffect(() => {
    if (!userId) return;

    const friendRequests = notifications.filter(
      (n) => n.type === "friend_request"
    );
    if (!friendRequests.length) return;

    const latest = friendRequests[0];

    if (!latestRequestRef.current) {
      latestRequestRef.current = latest.notificationId;
      return;
    }

    if (latest.notificationId !== latestRequestRef.current) {
      latestRequestRef.current = latest.notificationId;
      toast.info(latest.message);
    }
  }, [notifications, userId]);

  // To handle friend request responses like accepted or declined
  useEffect(() => {
    if (!userId) return;

    const responses = notifications.filter(
      (n) => n.type === "friend_request_response"
    );
    if (!responses.length) return;

    const latest = responses[0];

    if (!latestResponseRef.current) {
      latestResponseRef.current = latest.notificationId;
      return;
    }

    if (latest.notificationId !== latestResponseRef.current) {
      latestResponseRef.current = latest.notificationId;
      toast.info(latest.message);
    }
  }, [notifications, userId]);

  return null;
};

export default FriendRequests;
