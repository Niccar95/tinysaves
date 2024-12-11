import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import EditButton from "../components/EditButton";
import Image from "next/image";
import logo from "/public/logo.svg";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <section className="content">
        <h1>You need to be logged in to access this page</h1>
      </section>
    );
  }

  const userName = session.user?.name;
  const userAvatar = session.user.image || logo;

  return (
    <>
      <section className="content">
        <h1>My Profile</h1>

        <EditButton />

        <article className="profileCard">
          <div className="userImageContainer">
            <Image
              src={userAvatar}
              alt="User Avatar"
              className="avatarPreview"
              width="50"
              height="50"
            />
          </div>
          <h2>{userName}</h2>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;
