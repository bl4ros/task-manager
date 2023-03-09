import { useContext } from "react";
import { IDrawerContext } from "../contexts/DrawerContext";

export const useDrawerContext = () => {
  return useContext(IDrawerContext);
};
