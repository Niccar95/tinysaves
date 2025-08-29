"use client";

import React, { useState } from "react";
import NotificationsList from "./NotificationsList";
import { Notification } from "../contexts/NotificationsContext";

interface NotificationsPageClientProps {
  initialNotifications: Notification[];
}

const NotificationsPageClient = ({
  initialNotifications,
}: NotificationsPageClientProps) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  return (
    <NotificationsList
      notifications={notifications}
      setNotifications={setNotifications}
    />
  );
};

export default NotificationsPageClient;
