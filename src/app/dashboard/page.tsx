import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import LatestGoalCard from "../components/LatestGoalCard";
import Tips from "../components/Tips";
import { redirect } from "next/navigation";
import LatestMilestoneCard from "../components/LatestMilestoneCard";
import { getTranslations } from "next-intl/server";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const t = await getTranslations("pages");
  const tm = await getTranslations("messages");

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;
  const displayName = session.user.displayName || session?.user.name;
  const displayAvatar = session?.user?.image;
  const presetAvatar = "/presetAvatar.svg";

  return (
    <>
      <div className="content dashboard">
        <section className="goalSetupSection">
          <h1>{t("dashboard")}</h1>
          <div className="greetingContainer">
            <div className="userImageWrapper userImageWrapper--small">
              <Image
                src={displayAvatar || presetAvatar}
                alt="User Avatar"
                className="avatarPreview"
                width="50"
                height="50"
              />
            </div>
            {session !== null && (
              <h2>
                {tm("userGreeting")} {displayName}!
              </h2>
            )}
          </div>
          <Tips />
        </section>
        <section className="overviewSection">
          {userId && <LatestGoalCard userId={userId} />}
          {userId && <LatestMilestoneCard userId={userId} />}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
