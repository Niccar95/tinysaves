import { Notification } from "@/app/contexts/NotificationsContext";

export const getNotifications = async (): Promise<Notification[] | null> => {
  try {
    const response = await fetch("/api/notifications", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to get notifications");
      return null;
    }

    const data = await response.json();
    return data.notifications;
  } catch (error) {
    console.error("Failed to get notifications", error);
    return null;
  }
};
