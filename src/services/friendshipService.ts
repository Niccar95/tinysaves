export const sendFriendRequest = async (friendUsername: string) => {
  try {
    const response = await fetch("/api/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendUsername }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to send friend request:", error);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to send friend request", error);
    return null;
  }
};

export const getFriends = async () => {
  try {
    const response = await fetch("/api/friends", {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to get friends");
      return null;
    }

    const data = await response.json();
    return data.friends;
  } catch (error) {
    console.error("Failed to get friends", error);
    return null;
  }
};

export const acceptFriendRequest = async (notificationId: string) => {
  try {
    const response = await fetch("/api/friends/accept", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId }),
    });

    if (!response.ok) {
      console.error("Failed to accept friend request");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to accept friend request", error);
    return null;
  }
};

export const rejectFriendRequest = async (notificationId: string) => {
  try {
    const response = await fetch("/api/friends/reject", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId }),
    });

    if (!response.ok) {
      console.error("Failed to reject friend request");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to reject friend request", error);
    return null;
  }
};
