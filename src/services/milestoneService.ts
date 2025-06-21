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

export const fetchMilestoneForGoal = async (goalId: string) => {
  try {
    const response = await fetch(`/api/milestones/${goalId}`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Failed to fetch milestone");
  } catch (error) {
    console.error("Error fetching milestone:", error);
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
        }
      }
    }
  } catch (error) {
    console.error("Error creating milestones:", error);
  }
};

export const goalAmountMilestones = async (userId: string) => {
  const completedGoalsCount = await prisma.goals.count({
    where: { userId, isComplete: true },
  });

  if (completedGoalsCount >= 5) {
    const existingMilestone = await checkExistingMilestone(
      userId,
      "Avid saver"
    );
    if (!existingMilestone) {
      const milestone = await prisma.milestones.findFirst({
        where: { name: "Avid saver" },
      });

      if (milestone) {
        await prisma.userMilestones.create({
          data: {
            user: { connect: { userId } },
            milestone: { connect: { milestoneId: milestone.milestoneId } },
          },
        });
      }
    }
  }

  if (completedGoalsCount >= 10) {
    const existingMilestone = await checkExistingMilestone(
      userId,
      "Saving Guru"
    );
    if (!existingMilestone) {
      const milestone = await prisma.milestones.findFirst({
        where: { name: "Saving Guru" },
      });

      if (milestone) {
        await prisma.userMilestones.create({
          data: {
            user: { connect: { userId } },
            milestone: { connect: { milestoneId: milestone.milestoneId } },
          },
        });
      }
    }
  }
};
