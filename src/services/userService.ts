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
