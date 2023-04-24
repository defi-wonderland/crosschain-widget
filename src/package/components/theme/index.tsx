import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "./colors";
import { Theme, ThemeName } from "~/types";

export const getTheme = (theme?: ThemeName): Theme => {
  switch (theme) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return darkTheme;
  }
};

export const Themable = ({ children }: { children: React.ReactNode }) => {
  const theme = getTheme("dark");
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export * from "./colors";
