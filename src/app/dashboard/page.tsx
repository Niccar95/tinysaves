"use client";

import React from "react";
import SavingsForm from "../components/SavingsForm";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <>
      <section className="content">
        <h1>Dashboard</h1>

        {session !== null && <h2>Welcome {userName || "User"}!</h2>}

        <SavingsForm />
      </section>
    </>
  );
};

export default Dashboard;
