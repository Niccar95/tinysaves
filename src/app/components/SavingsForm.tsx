"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import money from "/public/moneyIcon.svg";

import { goalForm } from "@/utils/validationSchemas";
import { createGoal } from "@/services/goalService";

interface ISavingsFormProps {
  onSubmitSuccess: () => void;
}

const SavingsForm = ({ onSubmitSuccess }: ISavingsFormProps) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [title, setTitle] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("SEK");
  const [dueDate, setDueDate] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isFormHidden, setIsFormHidden] = useState<boolean>(true);

  const handleCreateGoal = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = goalForm.validate(
      { title, targetAmount, dueDate },
      { abortEarly: false }
    );

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      return;
    }

    const numericTargetAmount = parseFloat(targetAmount);

    const response = await createGoal(
      title,
      numericTargetAmount,
      dueDate || null,
      currency,
      userId
    );

    if (response.ok) {
      setSuccessMessage("Savings goal created successfully!");
      setTitle("");
      setTargetAmount("");
      setDueDate("");
      setCurrency("SEK");
      setErrors({});

      onSubmitSuccess();
    } else {
      setSuccessMessage("");
      console.log("Failed to create goal!");
    }

    setIsFormHidden(true);
  };

  const addNewGoal = () => {
    if (isFormHidden) {
      setTitle("");
      setTargetAmount("");
      setDueDate("");
      setCurrency("SEK");
      setErrors({});
      setSuccessMessage("");
      setIsFormHidden(false);
    } else {
      setIsFormHidden(true);
    }
  };

  return (
    <>
      <button className="addGoalButton" onClick={addNewGoal}>
        <i className="bi bi-plus-circle"></i>
        Add new goal
      </button>

      {!isFormHidden && (
        <div className="modalBackdrop" onClick={() => setIsFormHidden(true)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <form className="addGoalForm" onSubmit={handleCreateGoal}>
              <section className="topSection">
                <h2>Time to Save!</h2>
                <Image className="moneyIcon" src={money} alt="icon"></Image>
              </section>
              <div className="inputContainer">
                <label htmlFor="title">Your savings goal:</label>
                <div className="inputWrapper">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors({ ...errors, title: "" });
                    }}
                  ></input>
                  {errors.title && (
                    <div className="errorMessage">{errors.title}</div>
                  )}
                </div>

                <label htmlFor="targetAmount">Target amount to save:</label>
                <div className="inputWrapper">
                  <input
                    id="targetAmount"
                    type="text"
                    value={targetAmount}
                    onChange={(e) => {
                      setTargetAmount(e.target.value);
                      setErrors({ ...errors, targetAmount: "" });
                    }}
                    min="0"
                    inputMode="decimal"
                  ></input>
                  {errors.targetAmount && (
                    <div className="errorMessage">{errors.targetAmount}</div>
                  )}
                </div>

                <label htmlFor="currency">Select currency:</label>
                <select
                  name="currency"
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="SEK">SEK</option>
                  <option value="EUR">€</option>
                  <option value="GBP">£</option>
                  <option value="USD">$</option>
                </select>

                <label htmlFor="dueDate">Goal due date (optional):</label>

                <div className="inputWrapper">
                  <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                      setErrors({ ...errors, dueDate: "" });
                    }}
                  ></input>
                  {errors.dueDate && (
                    <div className="errorMessage">{errors.dueDate}</div>
                  )}
                </div>
              </div>

              {successMessage && (
                <div className="successMessage">{successMessage}</div>
              )}
              <button type="submit" className="submitButton margin">
                Add goal
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SavingsForm;
