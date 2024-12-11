import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import EditButton from "../components/EditButton";
import Image from "next/image";
import logo from "/public/logo.svg";
import star from "/public/star.svg";

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
  const displayName = session.user.displayName || "";
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
          <section className="profileInfoSection">
            <div className="profileTagsContainer">
              <h2 className="userNameTag">{userName}</h2>
              <h3>{displayName}</h3>
            </div>
            <div className="badgesContainer">
              <h4 className="badgesTag">Earned badges:</h4>
              <Image src={star} alt="star" className="badgesCountIcon" />
            </div>
          </section>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;
