import { createContext } from "react";

type Rates = Record<string, number>;

interface CurrencyContextType {
  rates: Rates | null;
  isLoading: boolean;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  rates: null,
  isLoading: true,
});
