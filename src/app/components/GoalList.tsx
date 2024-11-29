"use client";

import { Goals } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const GoalList = () => {
  const [goals, setGoals] = useState<Goals[]>([]);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      const fetchGoals = async () => {
        try {
          const response = await fetch(`/api/goals?userId=${userId}`);
          const data = await response.json();
          setGoals(data);
        } catch (error) {
          console.error("Failed to fetch goals", error);
        }
      };
      fetchGoals();
    }
  });

  return (
    <>
      <section>
        {goals.map((goal) => (
          <div key={goal.goalId}>{goal.title}</div>
        ))}
      </section>
    </>
  );
};

export default GoalList;
