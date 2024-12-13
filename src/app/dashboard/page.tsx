import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Messages from "../components/Messages";
import LatestGoalCard from "../components/LatestGoalCard";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session) {
    return <div>Please log in to view your dashboard</div>;
  }

  const userName = session.user?.name;
  const displayAvatar = session.user.image || "";

  return (
    <>
      <Messages />
      <div className="content dashboard">
        <section className="goalSetupSection">
          <h1>Dashboard</h1>
          <div className="greetingContainer">
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
          </div>
        </section>
        <section className="overviewSection">
          {userId && <LatestGoalCard userId={userId} />}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
