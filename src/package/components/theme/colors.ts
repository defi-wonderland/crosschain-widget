import { Theme } from "~/types";

export const darkTheme: Theme = {
  type: "dark",
  background: "#1D1C1C",
  buttonBackground: "#7C22A8",
  textPrimary: "#EBEBEB",
  textSecondary: "#B7B7B7",
  textDisabled: "",
  divider: "",
  border: "1px solid #EBEBEB",
  borderPrimary: "1px solid #B7B7B7",
  actionActive: "",
  actionHover: "",
  actionSelected: "",
  actionDisabled: "",
  actionDisabledBackground: "",
  borderRadius: "8px",
};

export const lightTheme: Theme = {
  type: "light",
  background: "",
  buttonBackground: "",
  textPrimary: "",
  textSecondary: "",
  textDisabled: "",
  divider: "",
  border: "",
  borderPrimary: "",
  actionActive: "",
  actionHover: "",
  actionSelected: "",
  actionDisabled: "",
  actionDisabledBackground: "",
  borderRadius: "4px",
};
