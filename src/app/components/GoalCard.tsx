"use client";

import { Goals, Milestones } from "@prisma/client";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ProgressBar from "./ProgressBar";
import { processCreatedAtDate, processDueDate } from "@/utils/dateUtils";
import ActionMenu from "./ActionMenu";
import { useSession } from "next-auth/react";
import { goalProgress } from "@/utils/validationSchemas";
import ProgressForm from "./ProgressForm";
import { updateGoalProgress } from "@/services/goalService";
import MilestoneModal from "./MilestoneModal";
import { fetchLatestMilestone } from "@/services/milestoneService";

interface GoalProps {
  goal: Goals;
  handleDeleteGoal: (goalId: string) => void;
  handleEditGoalTitle: (goalId: string, newTitle: string) => void;
  // onReachMilestone: () => void;
}

const GoalCard = ({
  goal,
  handleDeleteGoal,
  handleEditGoalTitle,
}: // onReachMilestone,
GoalProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openActionsMenu, setOpenActionsMenu] = useState<boolean>(false);

  const [progress, setProgress] = useState<string>("");
  const [displayProgress, setDisplayProgress] = useState<number>(goal.progress);
  const [isComplete, setIsComplete] = useState<boolean>(goal.isComplete);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const actionsMenuRef = useRef<HTMLDivElement | null>(null);

  const { formattedDate, daysRemaining, hoursRemaining } = processDueDate(
    goal.dueDate
  );
  const { formattedCreatedAtDate } = processCreatedAtDate(goal.createdAt);

  console.log("days:", daysRemaining);
  console.log("hours:", hoursRemaining);

  // const [milestone, setMilestone] = useState<Milestones | null>(null);

  // const getMilestone = useCallback(async () => {
  //   try {
  //     const fetchedMilestone = await fetchLatestMilestone();
  //     console.log("Fetched milestone:", fetchedMilestone);

  //     if (
  //       fetchedMilestone &&
  //       (!milestone || fetchedMilestone.milestoneId !== milestone.milestoneId)
  //     ) {
  //       setMilestone(fetchedMilestone);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching badge:", error);
  //   }
  // }, [milestone]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsMenuRef.current &&
        !actionsMenuRef.current.contains(event.target as Node)
      ) {
        setOpenActionsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdateProgress = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = goalProgress.validate({ progress });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      return;
    }

    const numericTargetAmount = parseFloat(progress);

    try {
      const data = await updateGoalProgress(
        goal.goalId,
        numericTargetAmount,
        goal.targetAmount,
        userId
      );

      // if (data.goal.progress !== displayProgress) {
      //   // await getMilestone();

      //   // onReachMilestone();
      // }

      setDisplayProgress(data.goal.progress);
      setIsComplete(data.goal.isComplete);
      setProgress("");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <MilestoneModal latestMilestone={milestone} /> */}
      <article className="goalCard">
        <div className="titleWrapper">
          <h2 className="goalTitle">{goal.title}</h2>
          <p className="createdAtTag">Added on {formattedCreatedAtDate}</p>

          <div ref={actionsMenuRef} onClick={(e) => e.stopPropagation()}>
            {openActionsMenu && (
              <ActionMenu
                goal={goal}
                deleteGoal={handleDeleteGoal}
                handleEditGoalTitle={handleEditGoalTitle}
              />
            )}

            <button
              className="actionsMenuButton"
              onClick={() => {
                setOpenActionsMenu(!openActionsMenu);
              }}
            >
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <ProgressBar
          progress={displayProgress}
          isComplete={isComplete}
          targetAmount={goal.targetAmount}
          currency={goal.currency}
        ></ProgressBar>

        {(daysRemaining === null || daysRemaining > 0 || hoursRemaining > 0) &&
          displayProgress < goal.targetAmount && (
            <button
              className="addButton"
              onClick={() => setIsEditing(!isEditing)}
            >
              <i className="bi bi-coin"></i>
              Update progress
            </button>
          )}

        {daysRemaining !== null &&
          daysRemaining <= 0 &&
          hoursRemaining <= 0 && <p>Due date reached!</p>}

        {isEditing && (
          <ProgressForm
            progress={progress}
            setProgress={setProgress}
            errors={errors}
            setErrors={setErrors}
            handleUpdateProgress={handleUpdateProgress}
          />
        )}

        {goal.dueDate !== null &&
          daysRemaining !== null &&
          daysRemaining >= 0 &&
          !goal.isComplete && (
            <section className="dueDateInfoSection">
              <p className="dueDateTag">
                <i className="bi bi-calendar-date"></i>
                Final date: {formattedDate}
              </p>

              {daysRemaining === 0 && hoursRemaining > 0 && (
                <p className="dueDateTag">
                  <i className="bi bi-clock"></i>
                  {hoursRemaining} hours remaining
                </p>
              )}

              {daysRemaining > 0 && (
                <p className="dueDateTag">
                  <i className="bi bi-clock"></i>
                  {daysRemaining} days remaining
                </p>
              )}
            </section>
          )}
        {goal.dueDate == null && <p className="noDateTag">No due date</p>}
      </article>
    </>
  );
};

export default GoalCard;
