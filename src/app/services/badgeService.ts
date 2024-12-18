import prisma from "../db";

export const createBadges = async (
  userId: string,
  progress: number,
  targetAmount: number
) => {
  if (progress >= targetAmount * 0.5) {
    const existingBadge = await prisma.userBadges.findFirst({
      where: { userId, badge: { name: "50% Progress" } },
    });

    if (!existingBadge) {
      await prisma.userBadges.create({
        data: {
          user: { connect: { userId } },
          badge: {
            create: {
              name: "Halfway there!",
              criteria: "Reached 50% of a goal",
              image: "/badgeIcons/badge50.svg",
            },
          },
        },
      });
    }
  }
};
