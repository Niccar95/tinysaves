import prisma from "@/app/db";
import { Milestones } from "@prisma/client";

export const fetchLatestMilestone = async (): Promise<Milestones | null> => {
  try {
    const response = await fetch("/api/milestones");
    if (response.ok) {
      const data = await response.json();
      return data ? data.latestMilestone : null;
    }
    throw new Error("Unable to fetch latest milestone");
  } catch (error) {
    console.error("Error fetching the milestone:", error);
    return null;
  }
};

const checkExistingMilestone = async (
  userId: string,
  milestoneName: string
) => {
  return await prisma.userMilestones.findFirst({
    where: {
      userId,
      milestone: { name: milestoneName },
    },
  });
};

export const createMilestones = async (
  userId: string,
  progress: number,
  targetAmount: number
) => {
  try {
    if (progress >= targetAmount * 0.25) {
      const existingMilestone = await checkExistingMilestone(
        userId,
        "Halfway to halfway"
      );
      if (!existingMilestone) {
        const milestone = await prisma.milestones.findFirst({
          where: { name: "Halfway to halfway" },
        });

        if (milestone) {
          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: milestone.milestoneId } },
            },
          });
        } else {
          const newMilestone = await prisma.milestones.create({
            data: {
              name: "Halfway to halfway",
              criteria: "Reached 25% of a goal",
              image: "/milestoneIcons/milestone25.svg",
            },
          });

          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: newMilestone.milestoneId } },
            },
          });
        }
      }
    }

    if (progress >= targetAmount * 0.5) {
      const existingMilestone = await checkExistingMilestone(
        userId,
        "Halfway there!"
      );
      if (!existingMilestone) {
        const milestone = await prisma.milestones.findFirst({
          where: { name: "Halfway there!" },
        });

        if (milestone) {
          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: milestone.milestoneId } },
            },
          });
        } else {
          const newMilestone = await prisma.milestones.create({
            data: {
              name: "Halfway there!",
              criteria: "Reached 50% of a goal",
              image: "/milestoneIcons/milestone50.svg",
            },
          });

          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: newMilestone.milestoneId } },
            },
          });
        }
      }
    }

    if (progress >= targetAmount * 0.75) {
      const existingMilestone = await checkExistingMilestone(
        userId,
        "Almost there!"
      );
      if (!existingMilestone) {
        const milestone = await prisma.milestones.findFirst({
          where: { name: "Almost there!" },
        });

        if (milestone) {
          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: milestone.milestoneId } },
            },
          });
        } else {
          const newMilestone = await prisma.milestones.create({
            data: {
              name: "Almost there!",
              criteria: "Reached 75% of a goal",
              image: "/milestoneIcons/milestone75.svg",
            },
          });

          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: newMilestone.milestoneId } },
            },
          });
        }
      }
    }

    if (progress >= targetAmount) {
      const existingMilestone = await checkExistingMilestone(
        userId,
        "One down, many to go"
      );
      if (!existingMilestone) {
        const milestone = await prisma.milestones.findFirst({
          where: { name: "One down, many to go" },
        });

        if (milestone) {
          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: milestone.milestoneId } },
            },
          });
        } else {
          const newMilestone = await prisma.milestones.create({
            data: {
              name: "One down, many to go",
              criteria: "Reached 100% of a goal",
              image: "/milestoneIcons/milestone100.svg",
            },
          });

          await prisma.userMilestones.create({
            data: {
              user: { connect: { userId } },
              milestone: { connect: { milestoneId: newMilestone.milestoneId } },
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error creating milestones:", error);
  }
};
