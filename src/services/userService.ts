import { User } from "@prisma/client";

export const updateUserProfile = async (
  userId: string,
  displayName: string,
  image: string
): Promise<User | null> => {
  try {
    const response = await fetch("/api/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        displayName,
        image,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update profile");
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Failed to update user", error);
    return null;
  }
};

export const findUserName = async (userName: string): Promise<User | null> => {
  try {
    const response = await fetch(
      `/api/findUser?userName=${encodeURIComponent(userName)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      console.error("Failed to get username");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to find user", error);
    return null;
  }
};

export const sendFriendRequest = async (
  toUserName: string,
  fromUserName: string
): Promise<{ message: string } | null> => {
  try {
    const response = await fetch("/api/sendFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toUserName, fromUserName }),
    });

    if (!response.ok) {
      console.error("Failed to send friend request");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to send friend request", error);
    return null;
  }
};

export const handleReceivedFriendRequest = async (
  userChoice: string,
  notificationId: string
): Promise<{ message: string } | null> => {
  try {
    const response = await fetch("/api/handleFriendRequest", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userChoice, notificationId }),
    });

    if (!response.ok) {
      console.error("Failed to accept/decline friend request");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to accpet/decline friend request", error);
    return null;
  }
};
