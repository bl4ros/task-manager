import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function DetalheDeTasks() {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {};

  const handleDelete = () => {};

  return (
    <LayoutBaseDePagina
      titulo="Detalhe da task"
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoSalvarEFechar
          aoCLicarEmSalvar={handleSave}
          aoCLicarEmSalvarEFechar={handleSave}
          aoCLicarEmNovo={() => navigate("/tasks/detalhe/nova")}
          aoCLicarEmApagar={handleDelete}
          aoCLicarEmVoltar={() => navigate("/tasks")}
        />
      }
    >
      Detalhe de tasks
    </LayoutBaseDePagina>
  );
}
