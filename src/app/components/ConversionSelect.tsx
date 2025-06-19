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

  const convertToUSD = () => {
    const converted = goalMoneyData.map((goal) => {
      if (goal.currency == "SEK" && goal.progress != null && rates != null) {
        return goal.progress / rates.SEK;
      }
      if (goal.currency == "EUR" && goal.progress != null && rates != null) {
        return goal.progress / rates.EUR;
      }
      if (goal.currency == "GBP" && goal.progress != null && rates != null) {
        return goal.progress / rates.GBP;
      }
      if (goal.currency == "USD" && goal.progress != null && rates != null) {
        return goal.progress;
      }
      return 0;
    });

    const totalInUSD = converted.reduce((sum, val) => sum + val, 0);
    return totalInUSD;
  };

  const baseCurrencySum = convertToUSD();

  let totalInEUR = 0;
  let totalInSEK = 0;
  let totalInGBP = 0;

  if (rates != null) {
    totalInEUR = baseCurrencySum * rates.EUR;
    totalInSEK = baseCurrencySum * rates.SEK;
    totalInGBP = baseCurrencySum * rates.GBP;
  }

  return (
    <article className="goalMoneyCard">
      <p className="boldLabel">
        Total saved (converted to different currencies):
      </p>
      <p>
        <span className="currencyLabel">USD (US Dollars): </span>
        <span className="amount">${baseCurrencySum.toFixed(2)}</span>
      </p>
      <p>
        <span className="currencyLabel">EUR (Euros): </span>
        <span className="amount">{totalInEUR.toFixed(2)} €</span>
      </p>
      <p>
        <span className="currencyLabel">SEK (Swedish Krona): </span>
        <span className="amount">{totalInSEK.toFixed(2)} kr</span>
      </p>
      <p>
        <span className="currencyLabel">GBP (British Pounds): </span>
        <span className="amount">£{totalInGBP.toFixed(2)}</span>
      </p>
    </article>
  );
};

export default ConversionSelect;
