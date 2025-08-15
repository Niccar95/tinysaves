"use client";
import { useState, useEffect, ReactNode } from "react";
import {
  NotificationsContext,
  Notification,
} from "../contexts/NotificationsContext";
import { getNotifications } from "@/services/notificationsService";
import { useSession } from "next-auth/react";

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

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

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
