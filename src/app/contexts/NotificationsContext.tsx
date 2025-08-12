import { createContext } from "react";

export interface Notification {
  userId: string;
  fromUserId: string;
  type: string;
  message: string;
  status: string;
  isRead: boolean;
}

interface Notifications {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

export const NotificationsContext = createContext<Notifications>({
  notifications: [],
  setNotifications: () => {},
});
