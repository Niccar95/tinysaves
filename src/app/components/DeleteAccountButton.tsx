"use client";

import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "react-toastify";

const DeleteAccountButton = () => {
  const { data: session } = useSession();
  const t = useTranslations("userSettings");

  const userId = session?.user.id;

  const deleteAccount = async () => {
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
      } else {
        toast.success("Account deleted successfully!");

        setTimeout(async () => {
          await signOut({
            callbackUrl: "/",
          });
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <button className="actionButton delete" onClick={deleteAccount}>
        <i className="bi bi-trash3"></i>
        {t("delete")}
      </button>
    </>
  );
};

export default DeleteAccountButton;
