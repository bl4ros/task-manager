import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListagemDeCategories } from "../pages/categories";
import { Dashboard } from "../pages/dashboard";
import { DetalheDeCategories } from "../pages/detalheCategories";
import { DetalheDeTasks } from "../pages/detalheTasks";
import { ListagemDeTasks } from "../pages/tasks";
import { useDrawerContext } from "../shared/hooks/useDrawerContext";

export function Router() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "Página inicial", icon: "home", path: "/pagina-inicial" },
      { label: "Tasks", icon: "star", path: "/tasks" },
      { label: "Categorias", icon: "star", path: "/categories" },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/tasks" element={<ListagemDeTasks />} />
      <Route path="/tasks/detalhe/:id" element={<DetalheDeTasks />} />

      <Route path="/categories" element={<ListagemDeCategories />} />
      <Route path="/categories/detalhe/:id" element={<DetalheDeCategories />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
