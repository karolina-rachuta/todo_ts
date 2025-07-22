import React, { createContext, useState } from "react";

enum Theme {
  light = "light",
  dark = "dark",
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(Theme.light);

  const toggleTheme = () =>
    setTheme((prev) => (prev === Theme.light ? Theme.dark : Theme.light));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
