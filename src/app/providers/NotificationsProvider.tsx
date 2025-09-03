"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  NotificationsContext,
  Notification,
} from "../contexts/NotificationsContext";
import { getNotifications } from "@/services/notificationsService";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";

const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY || "";
const pusherCluster = process.env.PUSHER_CLUSTER || "eu";

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.name;

  // Initial fetch
  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response) setNotifications(response);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    if (!pusherKey || !userId || !userName) return;

    const pusher = new Pusher(pusherKey, { cluster: pusherCluster });
    const channel = pusher.subscribe("friend-requests");

    const addNotification = (newNotification: Notification) => {
      setNotifications((prev) => {
        if (
          prev.some((n) => n.notificationId === newNotification.notificationId)
        )
          return prev;
        return [newNotification, ...prev];
      });
    };

    const onNew = (data: {
      to: string;
      from: string;
      notification: Notification;
    }) => {
      if (data.to !== userName) return;
      addNotification(data.notification);
    };

    const onUpdate = (data: {
      to: string;
      from: string;
      notification: Notification;
    }) => {
      if (data.to !== userName) return;
      console.log("onUpdate triggered:", data.notification.notificationId);

      setNotifications((prev) => {
        const remaining = prev.filter(
          (n) =>
            !(
              n.fromUserId === data.notification.fromUserId &&
              (n.type === "friend_request" ||
                n.type === "friend_request_response")
            )
        );
        return [data.notification, ...remaining];
      });
    };

    channel.bind("new-friend-request", onNew);
    channel.bind("friend-request-updated", onUpdate);

    return () => {
      channel.unbind("new-friend-request", onNew);
      channel.unbind("friend-request-updated", onUpdate);
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId, userName]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
