import { useContext } from "react";
import { IThemeContext } from "../contexts/ThemeContext";

export const useAppThemeContext = () => {
  return useContext(IThemeContext);
};
