"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/services/userService";
import AvatarSelector from "./AvatarSelector";
import { useClickOutside } from "../hooks/useClickOutside";
import { useTranslations } from "next-intl";

const EditProfileForm = () => {
  const { data: session, update } = useSession();
  const t = useTranslations("profileInfo.editForm");

  const router = useRouter();
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [avatarImage, setAvatarImage] = useState<string>("");

  const presetAvatar = "/presetAvatar.svg";

  const modalRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setIsEditing(false),
  });

  useEffect(() => {
    if (session) {
      setUserDisplayName(session.user.displayName || "");
      setAvatarImage(session.user.image || presetAvatar);
    }
  }, [session]);

  const handleEditProfile = async (e: FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error("User ID is not available");
      return;
    }

    const user = await updateUserProfile(
      session?.user.id,
      userDisplayName,
      avatarImage
    );

    if (user) {
      await update({
        ...session,
        user: {
          ...session?.user,
          displayName: user.displayName || "",
          image: user.image || "",
        },
      });

      setUserDisplayName(user.displayName || "");
      setAvatarImage(user.image || "");

      router.push("/profile");
    }
  };

  return (
    <>
      <div className="userImageWrapper userImageWrapper--large">
        <Image
          src={avatarImage || presetAvatar}
          alt="User Avatar"
          className="avatarPreview"
          width="50"
          height="50"
        />
        <div ref={modalRef}>
          <button
            className="addImageButton"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className="bi bi-pencil addImageIcon"></i>
          </button>
          {isEditing && (
            <AvatarSelector
              onAvatarSelect={(image) => {
                setAvatarImage(image);
                setIsEditing(false);
              }}
              onClose={() => setIsEditing(false)}
            />
          )}
        </div>
      </div>

      <form onSubmit={handleEditProfile}>
        <label htmlFor="changeName">{t("displayName")}</label>
        <div className="inputContainer">
          <input
            id="changeName"
            type="text"
            value={userDisplayName || ""}
            onChange={(e) => setUserDisplayName(e.target.value)}
          />
        </div>
        <button type="submit" className="saveButton margin">
          {t("save")}
        </button>
      </form>
    </>
  );
};

export default EditProfileForm;
