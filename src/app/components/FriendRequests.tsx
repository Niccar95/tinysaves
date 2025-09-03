"use client";

import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NotificationsContext } from "../contexts/NotificationsContext";

const FriendRequests = () => {
  const { notifications } = useContext(NotificationsContext);

  const latestRequestRef = useRef<string | null>(null);
  const latestResponseRef = useRef<string | null>(null);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const requests = notifications.filter((n) => n.type === "friend_request");
    if (requests.length === 0) return;

    const latest = requests[0];
    if (latest.notificationId !== latestRequestRef.current) {
      latestRequestRef.current = latest.notificationId;
      toast.info(latest.message);
    }
  }, [notifications]);

  useEffect(() => {
    const responses = notifications.filter(
      (n) => n.type === "friend_request_response"
    );
    if (responses.length === 0) return;

    const latest = responses[0];
    if (latest.notificationId !== latestResponseRef.current) {
      latestResponseRef.current = latest.notificationId;
      toast.info(latest.message);
    }
  }, [notifications]);

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
    }
  }, []);

  return null;
};

export default FriendRequests;
