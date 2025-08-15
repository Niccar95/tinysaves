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

    (async () => {
      try {
        const response = await getNotifications();
        if (response) setNotifications(response);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (!pusherKey || !userId || !userName) return;

    const pusher = new Pusher(pusherKey, { cluster: pusherCluster });
    const channel = pusher.subscribe("friend-requests");

    const handler = async (data: { to: string; from: string }) => {
      if (data.to !== userName) return;

      try {
        const next = await getNotifications();
        if (next) setNotifications(next);
      } catch (error) {
        console.error("Failed to refresh notifications after event", error);
      }
    };

    channel.bind("new-friend-request", handler);

    return () => {
      channel.unbind("new-friend-request", handler);
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
