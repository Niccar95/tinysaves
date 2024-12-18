import prisma from "../db";

const checkExistingBadge = async (userId: string, badgeName: string) => {
  return await prisma.userBadges.findFirst({
    where: {
      userId,
      badge: { name: badgeName },
    },
  });
};

export const createBadges = async (
  userId: string,
  progress: number,
  targetAmount: number
) => {
  try {
    if (progress >= targetAmount * 0.25) {
      const existingBadge = await checkExistingBadge(
        userId,
        "Halfway to halfway"
      );
      if (!existingBadge) {
        const badge = await prisma.badges.findFirst({
          where: { name: "Halfway to halfway" },
        });

        if (badge) {
          await prisma.userBadges.create({
            data: {
              user: { connect: { userId } },
              badge: { connect: { badgeId: badge.badgeId } },
            },
          });
        } else {
          const newBadge = await prisma.badges.create({
            data: {
              name: "Halfway to halfway",
              criteria: "Reached 25% of a goal",
              image: "/badgeIcons/badge25.svg",
            },
          });

          await prisma.userBadges.create({
            data: {
              user: { connect: { userId } },
              badge: { connect: { badgeId: newBadge.badgeId } },
            },
          });
        }
      }
    }

    if (progress >= targetAmount * 0.5) {
      const existingBadge = await checkExistingBadge(userId, "50% Progress");
      if (!existingBadge) {
        const badge = await prisma.badges.findFirst({
          where: { name: "50% Progress" },
        });

        if (badge) {
          await prisma.userBadges.create({
            data: {
              user: { connect: { userId } },
              badge: { connect: { badgeId: badge.badgeId } },
            },
          });
        } else {
          const newBadge = await prisma.badges.create({
            data: {
              name: "50% Progress",
              criteria: "Reached 50% of a goal",
              image: "/badgeIcons/badge50.svg",
            },
          });

          await prisma.userBadges.create({
            data: {
              user: { connect: { userId } },
              badge: { connect: { badgeId: newBadge.badgeId } },
            },
          });
        }
      }
    }

    if (progress >= targetAmount * 0.75) {
      const existingBadge = await checkExistingBadge(userId, "Almost there!");
      if (!existingBadge) {
        const badge = await prisma.badges.findFirst({
          where: { name: "Almost there!" },
        });

        if (badge) {
          await prisma.userBadges.create({
            data: {
              user: { connect: { userId } },
              badge: { connect: { badgeId: badge.badgeId } },
            },
          });
        } else {
          const newBadge = await prisma.badges.create({
            data: {
              name: "Almost there!",
              criteria: "Reached 75% of a goal",
              image: "/badgeIcons/badge75.svg",
            },
          });

          await prisma.userBadges.create({
            data: {
              user: { connect: { userId } },
              badge: { connect: { badgeId: newBadge.badgeId } },
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error creating badges:", error);
  }
};
