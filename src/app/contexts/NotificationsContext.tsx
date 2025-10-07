import { createContext } from "react";

export interface Notification {
  notificationId: string;
  userId: string;
  fromUserId: string | null;
  type: string;
  message: string;
  status: string;
  isRead: boolean;
}

interface Notifications {
  notifications: Notification[];
  setNotifications: (
    notifications:
      | Notification[]
      | ((prev: Notification[]) => Notification[])
  ) => void;
}

export const NotificationsContext = createContext<Notifications>({
  notifications: [],
  setNotifications: () => {},
});
