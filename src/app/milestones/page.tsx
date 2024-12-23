import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "../db";
import { redirect } from "next/navigation";
import MilestonesList from "../components/MilestonesList";

const MilestonesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const milestones = await prisma.userMilestones.findMany({
    where: { userId: userId },
    include: {
      milestone: true,
    },
  });

  return (
    <>
      <section className="content">
        <h1>My milestones</h1>
        <MilestonesList milestones={milestones} />
      </section>
    </>
  );
};

export default MilestonesPage;
