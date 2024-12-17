import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import logo from "/public/logo.svg";

import LatestGoalCard from "../components/LatestGoalCard";
import Tips from "../components/Tips";
import { redirect } from "next/navigation";
import LatestBadgeCard from "../components/LatestBadgeCard";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  const displayName = session.user.displayName || session?.user.name;
  const displayAvatar = session.user.image;

  return (
    <>
      <Tips />
      <div className="content dashboard">
        <section className="goalSetupSection">
          <h1>Dashboard</h1>
          <div className="greetingContainer">
            <div className="userImageContainer small">
              <Image
                src={displayAvatar || logo}
                alt="User Avatar"
                className="avatarPreview"
                width="50"
                height="50"
              />
            </div>
            {session !== null && <h2>Welcome {displayName}!</h2>}
          </div>
        </section>
        <section className="overviewSection">
          {userId && <LatestGoalCard userId={userId} />}
          {userId && <LatestBadgeCard userId={userId} />}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
