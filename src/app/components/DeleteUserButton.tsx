"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const DeleteUserButton = () => {
  const { data: session } = useSession();

  const userId = session?.user.id;

  const deleteUser = async () => {
    if (!userId) {
      console.error("User not found");
      return;
    }
    try {
      const response = await fetch("/api/edit", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <button className="actionButton delete" onClick={deleteUser}>
        <i className="bi bi-trash3"></i>
        Delete user
      </button>
    </>
  );
};

export default DeleteUserButton;
