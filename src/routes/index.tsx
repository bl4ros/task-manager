import { Button } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/hooks/useDrawerContext";

export function Router() {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "Página inicial", icon: "home", path: "/pagina-inicial" },
      { label: "Categorias", icon: "star", path: "/categorias" },
    ]);
  }, [setDrawerOptions]);

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
      <Route path="/categorias" element={<h1>Página de categorias</h1>} />

      {/* <Route path="*" element={<Navigate to="/pagina-inicial" />} /> */}
    </Routes>
  );
}
