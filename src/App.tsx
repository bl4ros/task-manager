import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { MenuLateral } from "./shared/components/menu-lateral";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateral>
          <Router />
        </MenuLateral>
      </BrowserRouter>
    </AppThemeProvider>
  );
}
