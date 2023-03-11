import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { DetalheDeTasks } from "../pages/detalheTasks";
import { ListagemDeTasks } from "../pages/tasks";
import { useDrawerContext } from "../shared/hooks/useDrawerContext";

export function Router() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { label: "Página inicial", icon: "home", path: "/pagina-inicial" },
      { label: "Tasks", icon: "star", path: "/tasks" },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/tasks" element={<ListagemDeTasks />} />
      <Route path="/tasks/detalhe/:id" element={<DetalheDeTasks />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
