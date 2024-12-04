import React from "react";
import SavingsForm from "../components/SavingsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to view your dashboard</div>;
  }

  const userName = session.user?.name;

  return (
    <>
      <section className="content">
        <h1>Dashboard</h1>
        <h1>sxcx</h1>

        {session !== null && <h2>Welcome {userName || "User"}!</h2>}

        <SavingsForm />
      </section>
    </>
  );
};

export default Dashboard;
