/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ThemeContext } from "@/context/theme";
import React from "react";

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
