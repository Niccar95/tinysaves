"use client";

import { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";

interface Goal {
  progress: number | null;
  targetAmount: number | null;
  currency: string;
}

interface GoalMoneyDataProps {
  goalMoneyData: Goal[];
}

const ConversionSelect = ({ goalMoneyData }: GoalMoneyDataProps) => {
  const { rates } = useContext(CurrencyContext);

  const totalSum = goalMoneyData.reduce(
    (sum, goal) => sum + (goal.progress ?? 0),
    0
  );

  const convertToUSD = () => {
    const converted = goalMoneyData.map((goal) => {
      if (goal.currency == "SEK" && goal.progress != null && rates != null) {
        return goal.progress / rates.SEK;
      }
      return 0;
    });

    const totalInUSD = converted.reduce((sum, val) => sum + val, 0);
    return totalInUSD;
  };

  console.log(convertToUSD());

  return (
    <p>
      <span className="boldLabel">Total money saved:</span> {totalSum}
    </p>
  );
};

export default ConversionSelect;
