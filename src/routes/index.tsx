import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListagemDeCategorias } from "../pages/categorias";
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

      <Route path="/categorias" element={<ListagemDeCategorias />} />
      {/* <Route path="/categorias/:id" element={<ListagemDeCategorias />} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
