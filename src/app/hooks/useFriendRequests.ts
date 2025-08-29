import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  NotificationsContext,
  Notification,
} from "../contexts/NotificationsContext";

export function useFriendRequests(loggedInUser: string) {
  const { notifications } = useContext(NotificationsContext);
  const handledNotificationIds = useRef<Set<string>>(new Set()); // keep track of which notifications have already triggered a toast

  useEffect(() => {
    // Filter notifications for new friend requests from other users
    const newFriendRequests = notifications.filter(
      (notification: Notification) => {
        return (
          notification.type === "friend-request" &&
          notification.fromUserId !== loggedInUser &&
          !handledNotificationIds.current.has(notification.notificationId)
        );
      }
    );

    // Show a toast for each new friend request and mark it as handled
    newFriendRequests.forEach((friendRequest) => {
      toast.info(`New friend request from ${friendRequest.fromUserId}`);
      handledNotificationIds.current.add(friendRequest.notificationId);
    });
  }, [notifications, loggedInUser]);
}
