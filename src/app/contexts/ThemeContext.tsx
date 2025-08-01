import { createContext } from "react";

type ThemeContextType = {
  trackedTheme: string;
  setTrackedTheme: (theme: string) => void;
};
export const ThemeContext = createContext<ThemeContextType>({
  trackedTheme: "",
  setTrackedTheme: () => {},
});
