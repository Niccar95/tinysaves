import { Goals } from "@prisma/client";

interface UpdateGoalProgressResponse {
  goal: {
    goalId: string;
    progress: number;
    isComplete: boolean;
  };
}

export const getLatestGoal = async (userId: string): Promise<Goals | null> => {
  try {
    const response = await fetch(`/api/goals?userId=${userId}&latest=true`);
    const data = await response.json();

    if (response.ok && data.latestGoal) {
      return data.latestGoal;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching latest goal:", error);
    throw error;
  }
};

export const createGoal = async (
  title: string,
  targetAmount: number,
  dueDate: string | null,
  currency: string,
  userId: string | undefined
): Promise<Response> => {
  try {
    const response = await fetch("/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, targetAmount, dueDate, currency, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add new goal");
    }

    //I chose to return response only because I just wanna check that the request was successfull

    return response;
  } catch (error) {
    console.error("Failed to create goal", error);
    throw error;
  }
};

export const updateGoalProgress = async (
  goalId: string,
  progress: number,
  targetAmount: number,
  userId: string | undefined
): Promise<UpdateGoalProgressResponse> => {
  try {
    const response = await fetch(`/api/goals/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goalId, progress, targetAmount, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to update goal progress");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating goal progress:", error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  try {
    const response = await fetch("/api/goals", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goalId: goalId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete goal");
    }
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
};

export const editGoalTitle = async (
  goalId: string,
  goalTitle: string
): Promise<void> => {
  try {
    const response = await fetch("/api/goals", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goalId: goalId, goalTitle: goalTitle }),
    });

    if (!response.ok) {
      throw new Error("Failed to update goal name");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating goal name:", error);
    throw error;
  }
};
