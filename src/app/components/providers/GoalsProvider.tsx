"use client";

import React, { useState, useEffect } from "react";
import { Goals } from "@prisma/client";
import { GoalsContext } from "@/app/contexts/GoalsContext";
import { useSession } from "next-auth/react";

interface GoalsProviderProps {
  children: React.ReactNode;
}

const GoalsProvider = ({ children }: GoalsProviderProps) => {
  const { data: session } = useSession();

  const [goals, setGoals] = useState<Goals[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const userId = session?.user.id;

      if (!userId || isFetched) return;

      try {
        const response = await fetch(`/api/goals?userId=${userId}`);
        const data = await response.json();

        if (data?.allGoals?.length > 0) {
          setGoals(data.allGoals);
          setIsFetched(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchGoals();
  }, [session?.user.id, isFetched]);

  return (
    <GoalsContext.Provider value={{ goals, setGoals }}>
      {children}
    </GoalsContext.Provider>
  );
};

export default GoalsProvider;
