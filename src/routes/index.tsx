import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { useDrawerContext } from "../shared/hooks/useDrawerContext";

export function Router() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "Página inicial", icon: "home", path: "/pagina-inicial" },
      { label: "Categorias", icon: "star", path: "/categorias" },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/categorias" element={<h1>Página de categorias</h1>} />

      {/* <Route path="*" element={<Navigate to="/pagina-inicial" />} /> */}
    </Routes>
  );
}
