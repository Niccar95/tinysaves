"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import piggyBank from "/public/piggyBank.svg";
import coffeeCup from "/public/coffeeCup.svg";
import logo from "/public/logo.svg";
import { useRouter } from "next/navigation";

const EditProfileForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userDisplayName, setUserDisplayName] = useState<string>(
    session?.user.displayName || ""
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [avatarImage, setAvatarImage] = useState<string | null>(
    session?.user.image || null
  );

  const addAvatar = (image: string) => {
    setAvatarImage(image);
  };

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
          image: avatarImage,
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
          image: user.image,
        },
      });

      setUserDisplayName(user.displayName);
      setAvatarImage(user.image);

      router.push("/profile");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const openAvatarSelection = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="userImageContainer">
        <Image
          src={avatarImage || logo}
          alt="User Avatar"
          className="avatarPreview"
          width="50"
          height="50"
        />
        <button className="addImageButton" onClick={openAvatarSelection}>
          <i className="bi bi-pencil addImageIcon"></i>
        </button>
      </div>

      {isEditing && (
        <section className="avatarSelection">
          <Image
            className="avatar"
            src={piggyBank}
            alt="piggyBank"
            width="50"
            onClick={() => addAvatar("/piggyBank.svg")}
          ></Image>
          <Image
            className="avatar"
            src={coffeeCup}
            alt="coffeeCup"
            width="50"
            onClick={() => addAvatar("/coffeeCup.svg")}
          ></Image>
        </section>
      )}

      <form onSubmit={handleEditProfile}>
        <label htmlFor="changeName">Edit your display name: </label>
        <div className="inputContainer">
          <input
            id="changeName"
            type="text"
            value={userDisplayName}
            onChange={(e) => setUserDisplayName(e.target.value)}
          />
          <i className="bi bi-pencil"></i>
        </div>
        <button type="submit" className="saveButton">
          Save changes
        </button>
      </form>
    </>
  );
};

export default EditProfileForm;
