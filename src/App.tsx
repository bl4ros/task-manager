import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { MenuLateral } from "./shared/components/menu-lateral";
import { AppDrawerProvider } from "./shared/contexts/DrawerContext";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export function App() {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <Router />
          </MenuLateral>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );
}
