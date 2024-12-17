import { Goals } from "@prisma/client";
import { createContext, useContext } from "react";

export interface IGoalsContext {
  goals: Goals[];
  setGoals: (goals: Goals[]) => void;
}

export const GoalsContext = createContext<IGoalsContext>({
  goals: [],
  setGoals: () => {},
});

export const useGoalsContext = () => {
  return useContext(GoalsContext);
};
