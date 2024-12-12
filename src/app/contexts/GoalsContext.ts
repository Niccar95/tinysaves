import { Goals } from "@prisma/client";
import { createContext } from "react";

export interface IGoalsContext {
  goals: Goals[];
  setGoals: (goals: Goals[]) => void;
  singleGoal: Goals | null;
  setSingleGoal: (goal: Goals | null) => void;
}

export const GoalsContext = createContext<IGoalsContext>({
  goals: [],
  setGoals: () => {},
  singleGoal: null,
  setSingleGoal: () => {},
});
