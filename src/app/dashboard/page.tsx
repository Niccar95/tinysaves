import React from "react";
import SavingsForm from "../components/SavingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Messages from "../components/Messages";
import prisma from "../db";
import LatestGoalCard from "../components/LatestGoalCard";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const latestGoal = await prisma.goals.findFirst({
    where: { userId: userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!session) {
    return <div>Please log in to view your dashboard</div>;
  }

  const userName = session.user?.name;
  const displayAvatar = session.user.image || "";

  return (
    <>
      <Messages />
      <section className="content">
        <h1>Dashboard</h1>

        <section className="greetingSection">
          <div className="userImageContainer small">
            <Image
              src={displayAvatar}
              alt="User Avatar"
              className="avatarPreview"
              width="50"
              height="50"
            />
          </div>
          {session !== null && <h2>Welcome {userName || ""}!</h2>}
        </section>
        <SavingsForm />

        {latestGoal ? (
          <LatestGoalCard goal={latestGoal} />
        ) : (
          <p>No added goal yet.</p>
        )}
      </section>
    </>
  );
};

export default Dashboard;
