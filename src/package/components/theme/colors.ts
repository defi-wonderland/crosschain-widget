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
  actionActive: "#EBEBEB",
  actionHover: "",
  actionSelected: "",
  actionDisabled: "#444444",
  actionDisabledBackground: "#2B2B2D",
  borderRadius: "8px",
};

export const lightTheme: Theme = {
  type: "light",
  background: "white",
  buttonBackground: "#7C22A8",
  textPrimary: "#202021",
  textSecondary: "#212121",
  textDisabled: "#777777",
  divider: "",
  border: "1px solid #C4C4C4",
  borderPrimary: "1px solid #C4C4C4",
  actionActive: "#EBEBEB",
  actionHover: "",
  actionSelected: "",
  actionDisabled: "#777777",
  actionDisabledBackground: "#EBEBEB",
  borderRadius: "8px",
};
