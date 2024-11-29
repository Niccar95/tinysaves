"use client";

import { Goals } from "@prisma/client";
import GoalCard from "./GoalCard";

interface GoalListProps {
  goals: Goals[];
}

const GoalList = ({ goals }: GoalListProps) => {
  return (
    <>
      <section>
        {goals.map((goal) => (
          <GoalCard key={goal.goalId} goal={goal}></GoalCard>
        ))}
      </section>
    </>
  );
};

export default GoalList;
