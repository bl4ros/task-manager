import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/hooks/useAppDrawerContext";

export function Router() {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawerOpen}
          >
            Toogle Drawer
          </Button>
        }
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
