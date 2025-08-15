"use client";

import { useState, ReactNode, useEffect, useRef } from "react";
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
  const notificationsRef = useRef(notifications);

  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    notificationsRef.current = notifications;
  }, [notifications]);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response) setNotifications(response);
      } catch (error) {
        console.log("Failed to get notifications", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    if (!pusherKey || !userId) return;

    const pusher = new Pusher(pusherKey, { cluster: pusherCluster });
    const channel = pusher.subscribe(`user-${userId}-notifications`);

    channel.bind("new-notification", (notification: Notification) => {
      setNotifications([...notificationsRef.current, notification]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
