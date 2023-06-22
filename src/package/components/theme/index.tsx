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

interface ThemableProps {
  lightTheme?: boolean;
  children: React.ReactNode;
}

export const Themable = ({ children, lightTheme }: ThemableProps) => {
  const theme = getTheme(lightTheme ? "light" : "dark");
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export * from "./colors";
