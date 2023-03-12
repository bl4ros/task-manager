import { Box, LinearProgress, TextField } from "@mui/material";
import { Form } from "@unform/web";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe";
import { VTextField } from "../../shared/forms/VTextField";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TasksService } from "../../shared/services/api/tasks";

export function DetalheDeTasks() {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      TasksService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/tasks");
        } else {
          setContent(result.content);
          console.log(result);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = () => {};

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      TasksService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Task apagada com sucesso!");
          navigate("/tasks");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova task" : content}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          mostrarBotaoSalvarEFechar
          aoCLicarEmSalvar={handleSave}
          aoCLicarEmSalvarEFechar={handleSave}
          aoCLicarEmNovo={() => navigate("/tasks/detalhe/nova")}
          aoCLicarEmApagar={() => handleDelete(Number(id))}
          aoCLicarEmVoltar={() => navigate("/tasks")}
        />
      }
    >
      <Form onSubmit={(dados) => console.log(dados)}>
        <VTextField name="content" />
        <button type="submit">Submit</button>
      </Form>
    </LayoutBaseDePagina>
  );
}
