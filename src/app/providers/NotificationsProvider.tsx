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

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        if (data) setNotifications(data);
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

    const addOrUpdateNotification = (notification: Notification) => {
      setNotifications((prev) => {
        const exists = prev.find(
          (n) => n.notificationId === notification.notificationId
        );
        if (exists) {
          return prev.map((n) =>
            n.notificationId === notification.notificationId ? notification : n
          );
        }
        return [notification, ...prev];
      });
    };

    const onNew = (data: {
      to: string;
      from: string;
      notification: Notification;
    }) => {
      if (data.to !== userName) return;
      addOrUpdateNotification(data.notification);
    };

    const onUpdate = (data: {
      to: string;
      from: string;
      notification: Notification;
    }) => {
      if (data.to !== userName) return;
      addOrUpdateNotification(data.notification);
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
