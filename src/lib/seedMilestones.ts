import prisma from "@/app/db";

const predefinedMilestones = [
  {
    name: "Halfway to halfway",
    criteria: "Reached 25% of a goal",
    image: "/milestoneIcons/milestone25.svg",
  },
  {
    name: "Halfway there!",
    criteria: "Reached 50% of a goal",
    image: "/milestoneIcons/milestone50.svg",
  },
  {
    name: "Almost there!",
    criteria: "Reached 75% of a goal",
    image: "/milestoneIcons/milestone75.svg",
  },
  {
    name: "One down, many to go",
    criteria: "Reached 100% of a goal",
    image: "/milestoneIcons/milestone100.svg",
  },
  {
    name: "Avid saver",
    criteria: "Completed 5 goals",
    image: "/milestoneIcons/milestone5.svg",
  },
  {
    name: "Saving Guru",
    criteria: "Completed 10 goals",
    image: "/milestoneIcons/milestone10.svg",
  },
];

let seeded = false;

export const ensureMilestonesExist = async () => {
  if (seeded) return;

  for (const milestone of predefinedMilestones) {
    const exists = await prisma.milestones.findFirst({
      where: { name: milestone.name },
    });

    if (!exists) {
      await prisma.milestones.create({ data: milestone });
    }
  }

  seeded = true;
};
