import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TasksService } from "../../shared/services/api/tasks";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VForm, VSelect, VTextField } from "../../shared/forms";
import { useVForm } from "../../shared/forms/useVForm";

interface IFormData {
  content: string;
  categoria: string;
}

export function DetalheDeTasks() {
  const { id = "nova" } = useParams<"id">();
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState("");

  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
    } else {
      formRef.current?.setData({
        content: "",
      });
    }
  }, [id, navigate, formRef]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (dados.content.length <= 3) {
      formRef.current?.setFieldError(
        "content",
        "O campo precisa ser preenchido"
      );
      setIsLoading(false);

      return;
    }

    if (dados.categoria === undefined) {
      formRef.current?.setFieldError(
        "categoria",
        "O campo precisa ser selecionado"
      );
      setIsLoading(false);

      return;
    }

    if (id === "nova") {
      TasksService.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          if (isSaveAndClose()) {
            navigate(`/tasks`);
          } else {
            navigate(`/tasks/detalhe/${result}`);
          }
        }
      });
    } else {
      TasksService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            if (isSaveAndClose()) {
              navigate(`/tasks`);
            }
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
          aoCLicarEmSalvar={save}
          aoCLicarEmSalvarEFechar={saveAndClose}
          aoCLicarEmNovo={() => navigate("/tasks/detalhe/nova")}
          aoCLicarEmApagar={() => handleDelete(Number(id))}
          aoCLicarEmVoltar={saveAndClose}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <label htmlFor="">Descrição da task</label>
                <VTextField
                  fullWidth
                  name="content"
                  disabled={isLoading}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <label htmlFor="">Selecione uma categoria</label>
                <VSelect disabled={isLoading} fullWidth name="categoria" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
}
