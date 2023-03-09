import { createContext, useCallback, useState } from "react";

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

export const DrawerContext = createContext({} as IDrawerContextData);

interface IDrawerProviderProps {
  children: React.ReactNode;
}
export const AppDrawerProvider: React.FC<IDrawerProviderProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
