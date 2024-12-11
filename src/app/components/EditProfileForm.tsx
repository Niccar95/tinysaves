"use client";

import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const EditProfileForm = () => {
  const { data: session, update } = useSession();
  const [userDisplayName, setUserDisplayName] = useState<string>(
    session?.user.displayName || ""
  );

  const handleEditProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          displayName: userDisplayName,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update profile");
        return;
      }

      const { user } = await response.json();

      await update({
        ...session,
        user: {
          ...session?.user,
          displayName: user.displayName,
        },
      });

      setUserDisplayName(user.displayName);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <form onSubmit={handleEditProfile}>
      <label htmlFor="changeName">Edit your display name: </label>
      <input
        id="changeName"
        type="text"
        value={userDisplayName}
        onChange={(e) => setUserDisplayName(e.target.value)}
      />
      <button type="submit" className="saveButton">
        Save changes
      </button>
    </form>
  );
};

export default EditProfileForm;
