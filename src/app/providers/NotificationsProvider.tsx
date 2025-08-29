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

    const onNew = (data: {
      to: string;
      from: string;
      notification: Notification;
    }) => {
      console.log("Received friend request:", data);
      console.log("userName:", userName, "userId:", userId);
      console.log("Match?", data.to === userName);

      if (data.to !== userName) {
        console.log("Not for this user, ignoring");
        return;
      }

      console.log("Adding notification:", data.notification);
      setNotifications((prev) => {
        console.log("Previous notifications:", prev);
        const newNotifications = [data.notification, ...prev];
        console.log("New notifications array:", newNotifications);
        return newNotifications;
      });
    };

    channel.bind("new-friend-request", onNew);

    return () => {
      channel.unbind("new-friend-request", onNew);
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
