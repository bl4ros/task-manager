import { useContext } from "react";
import { DrawerContext } from "../contexts/DrawerContext";

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};
