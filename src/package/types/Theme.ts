export type ThemeName = "light" | "dark";

export interface Theme {
  actionActive: string;
  actionDisabled: string;
  actionDisabledBackground: string;
  actionHover: string;
  actionSelected: string;
  background: string;
  buttonBackground: string;
  divider: string;
  border: string;
  borderPrimary: string;
  textDisabled: string;
  textPrimary: string;
  textSecondary: string;
  borderRadius: string;
  error: string;
  borderError: string;
  type: "dark" | "light";
}

export interface PropTheme {
  theme: Theme;
}
