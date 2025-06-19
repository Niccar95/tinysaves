"use client";
import React, { useEffect, useState } from "react";
import { CurrencyContext } from "../contexts/CurrencyContext";

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch rates");
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <CurrencyContext.Provider value={{ rates, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
