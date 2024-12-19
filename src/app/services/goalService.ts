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
};
