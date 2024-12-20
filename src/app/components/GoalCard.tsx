"use client";

import { Badges, Goals } from "@prisma/client";
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
import { updateGoalProgress } from "../services/goalService";
import { goalProgress } from "@/utils/validationSchemas";
import { fetchLatestBadge } from "../services/badgeService";
import EarnedBadgeModal from "./EarnedBadgeModal";
import ProgressForm from "./ProgressForm";

interface GoalProps {
  goal: Goals;
  handleDeleteGoal: (goalId: string) => void;
}

const GoalCard = ({ goal, handleDeleteGoal }: GoalProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openActionsMenu, setOpenActionsMenu] = useState<boolean>(false);

  const [progress, setProgress] = useState<string>("");
  const [displayProgress, setDisplayProgress] = useState<number>(goal.progress);
  const [isComplete, setIsComplete] = useState<boolean>(goal.isComplete);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const actionsMenuRef = useRef<HTMLDivElement | null>(null);

  const { formattedDate, daysRemaining } = processDueDate(goal.dueDate);
  const { formattedCreatedAtDate } = processCreatedAtDate(goal.createdAt);

  const [badge, setBadge] = useState<Badges | null>(null);

  const getBadge = useCallback(async () => {
    try {
      const fetchedBadge = await fetchLatestBadge();
      console.log("Fetched Badge:", fetchedBadge);

      if (fetchedBadge && (!badge || fetchedBadge.badgeId !== badge.badgeId)) {
        setBadge(fetchedBadge);
      }
    } catch (error) {
      console.error("Error fetching badge:", error);
    }
  }, [badge]);

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

  const handleOpenForm = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

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

      if (data.goal.progress !== displayProgress) {
        await getBadge();
      }

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
      <EarnedBadgeModal latestBadge={badge} />
      <article className="goalCard">
        <div className="titleWrapper">
          <h2 className="goalTitle">{goal.title}</h2>
          <p className="createdAtTag">Added on {formattedCreatedAtDate}</p>

          <div ref={actionsMenuRef} onClick={(e) => e.stopPropagation()}>
            {openActionsMenu && (
              <ActionMenu goal={goal} deleteGoal={handleDeleteGoal} />
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

        <section className="updateSection">
          {(daysRemaining === null || daysRemaining > 0) &&
            displayProgress < goal.targetAmount && (
              <button className="addButton" onClick={handleOpenForm}>
                <i className="bi bi-coin"></i>
                Update progress
              </button>
            )}
        </section>

        {daysRemaining !== null && daysRemaining <= 0 && (
          <p>Due date reached!</p>
        )}

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
              <p className="dueDateTag">
                <i className="bi bi-clock"></i>
                {daysRemaining} days remaining
              </p>
            </section>
          )}
        {goal.dueDate == null && <p className="noDateTag">No due date</p>}
      </article>
    </>
  );
};

export default GoalCard;
