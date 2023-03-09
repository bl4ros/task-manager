import { Box, ThemeProvider } from "@mui/material";
import React, { createContext, ReactNode } from "react";
import { DarktTheme, LightTheme } from "../themes";

interface IThemeContextProps {
  themeName: "light" | "dark";
  toogleTheme: () => void;
}

export const IThemeContext = createContext({} as IThemeContextProps);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({ children }: ThemeContextProviderProps) {
  const [themeName, setThemeName] = React.useState<"light" | "dark">("light");

  const toogleTheme = React.useCallback(
    () =>
      setThemeName((oldThemeName) =>
        oldThemeName === "light" ? "dark" : "light"
      ),
    []
  );

  const theme = React.useMemo(() => {
    if (themeName === "light") return LightTheme;

    return DarktTheme;
  }, [themeName]);

  return (
    <IThemeContext.Provider value={{ themeName, toogleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </IThemeContext.Provider>
  );
}
