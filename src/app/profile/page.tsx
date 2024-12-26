import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import EditButton from "../components/EditButton";
import Image from "next/image";
import star from "/public/star.svg";
import { redirect } from "next/navigation";
import prisma from "../db";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userName = session.user.name;
  const userId = session.user.id;
  const displayName = session.user.displayName || "";
  const userAvatar = session.user.image;
  const presetAvatar = "/presetAvatar.svg";

  const badges = await prisma.userMilestones.findMany({
    where: { userId: userId },
  });

  const milestoneAmount = badges.length;

  console.log(milestoneAmount);

  return (
    <>
      <section className="content">
        <section className="profileHeader">
          <h1>My profile</h1>
          <EditButton />
        </section>

        <article className="profileCard">
          <div className="userImageContainer">
            <Image
              src={userAvatar || presetAvatar}
              alt="User Avatar"
              className="avatarPreview"
              width="50"
              height="50"
            />
          </div>
          <section className="profileInfoSection">
            <div>
              <h2 className="userNameLabel">{userName}</h2>
              <h3>{displayName}</h3>
            </div>
            <div>
              <h4 className="milestonesLabel">Reached milestones:</h4>
              <div className="milestonesIconContainer">
                <Image src={star} alt="star" className="milestonesCountIcon" />
                <h3>{milestoneAmount}</h3>
              </div>
            </div>
          </section>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;
