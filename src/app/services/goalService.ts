interface UpdateGoalProgressResponse {
  goal: {
    goalId: string;
    progress: number;
    isComplete: boolean;
  };
}

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
