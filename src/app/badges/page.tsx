import React from "react";
import BadgesList from "../components/BadgesList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "../db";

const BadgesPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const userBadges = await prisma.userBadges.findMany({
    where: { userId: userId }, // Assuming you're filtering by userId
    include: {
      badge: true, // Include the related badge
    },
  });

  console.log(userBadges);

  return (
    <>
      <section className="content">
        <h1>My badges</h1>
        <BadgesList userBadges={userBadges} />
      </section>
    </>
  );
};

export default BadgesPage;
