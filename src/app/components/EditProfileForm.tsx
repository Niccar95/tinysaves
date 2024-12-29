"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/services/userService";

const EditProfileForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userDisplayName, setUserDisplayName] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [avatarImage, setAvatarImage] = useState<string>("");

  const piggyBank = "/piggyBank.svg";
  const coffeeCup = "/coffeeCup.svg";
  const hamburger = "/hamburger.svg";
  const sunglasses = "/sunglasses.svg";
  const hotDog = "/hotDog.svg";
  const presetAvatar = "/presetAvatar.svg";

  useEffect(() => {
    if (session) {
      setUserDisplayName(session.user.displayName || "");
      setAvatarImage(session.user.image || presetAvatar);
    }
  }, [session]);

  const addAvatar = (image: string) => {
    setAvatarImage(image);
    setIsEditing(false);
  };

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
      <div className="userImageContainer">
        <Image
          src={avatarImage || presetAvatar}
          alt="User Avatar"
          className="avatarPreview"
          width="50"
          height="50"
        />
        <button
          className="addImageButton"
          onClick={() => setIsEditing(!isEditing)}
        >
          <i className="bi bi-pencil addImageIcon"></i>
        </button>
      </div>

      {isEditing && (
        <section className="avatarSelection">
          <Image
            className="avatar"
            src={piggyBank}
            alt="piggybank"
            height="50"
            width="50"
            onClick={() => addAvatar(piggyBank)}
          ></Image>
          <Image
            className="avatar"
            src={coffeeCup}
            alt="coffee cup"
            height="50"
            width="50"
            onClick={() => addAvatar(coffeeCup)}
          ></Image>
          <Image
            className="avatar"
            src={hamburger}
            alt="hamburger"
            height="50"
            width="50"
            onClick={() => addAvatar(hamburger)}
          ></Image>
          <Image
            className="avatar"
            src={sunglasses}
            alt="sunglasses"
            height="50"
            width="50"
            onClick={() => addAvatar(sunglasses)}
          ></Image>
          <Image
            className="avatar"
            src={hotDog}
            alt="hot dog"
            height="50"
            width="50"
            onClick={() => addAvatar(hotDog)}
          ></Image>
        </section>
      )}

      <form onSubmit={handleEditProfile}>
        <label htmlFor="changeName">Edit your display name: </label>
        <div className="inputContainer">
          <input
            id="changeName"
            type="text"
            value={userDisplayName || ""}
            onChange={(e) => setUserDisplayName(e.target.value)}
          />
        </div>
        <button type="submit" className="saveButton margin">
          Save changes
        </button>
      </form>
    </>
  );
};

export default EditProfileForm;
