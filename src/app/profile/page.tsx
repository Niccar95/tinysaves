import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import EditButton from "../components/EditButton";
import Image from "next/image";
import logo from "/public/logo.svg";
import star from "/public/star.svg";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userName = session.user.name;
  const displayName = session.user.displayName || "";
  const userAvatar = session.user.image || logo;

  return (
    <>
      <section className="content">
        <h1>My profile</h1>

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
              <div className="badgesIconContainer">
                <Image src={star} alt="star" className="badgesCountIcon" />
                <h3 className="badgeCount">0</h3>
              </div>
            </div>
          </section>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;
