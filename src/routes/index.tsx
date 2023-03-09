import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext } from "../shared/hooks/useAppThemeContext";

export function Router() {
  const { toogleTheme } = useAppThemeContext();

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary" onClick={toogleTheme}>
            Teste
          </Button>
        }
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
