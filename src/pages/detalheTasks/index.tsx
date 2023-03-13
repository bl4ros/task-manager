import { Form } from "@unform/web";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe";
import { VTextField } from "../../shared/forms/VTextField";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TasksService } from "../../shared/services/api/tasks";
import FormControl from "@mui/material/FormControl";
import { VSelect } from "../../shared/forms/VSelect";
import { FormHandles } from "@unform/core";

interface IFormData {
  content: string;
  categoria: string;
  categoriaId: number;
}

export function DetalheDeTasks() {
  const { id = "nova" } = useParams<"id">();
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState("");

  const navigate = useNavigate();

  const formRef = React.useRef<FormHandles>(null);

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
          formRef.current?.setData(result);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id === "nova") {
      TasksService.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/tasks/detalhe/${result}`);
        }
      });
    } else {
      TasksService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          }
        }
      );
    }
  };

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
          aoCLicarEmSalvar={() => formRef.current?.submitForm()}
          aoCLicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoCLicarEmNovo={() => navigate("/tasks/detalhe/nova")}
          aoCLicarEmApagar={() => handleDelete(Number(id))}
          aoCLicarEmVoltar={() => navigate("/tasks")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <FormControl>
          <VTextField placeholder="Descrição da task" name="content" />
          <VTextField placeholder="Id da categoria" name="categoriaId" />
          <VSelect name="categoria" />
        </FormControl>
      </Form>
    </LayoutBaseDePagina>
  );
}
