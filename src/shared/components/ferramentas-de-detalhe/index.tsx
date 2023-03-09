import { Button, Divider, Icon, Paper, useTheme } from "@mui/material";
import { Box } from "@mui/system";

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoCLicarEmNovo?: () => void;
  aoCLicarEmVoltar?: () => void;
  aoCLicarEmApagar?: () => void;
  aoCLicarEmSalvar?: () => void;
  aoCLicarEmSalvarEFechar?: () => void;
}

export function FerramentasDeDetalhes({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoCLicarEmNovo,
  aoCLicarEmVoltar,
  aoCLicarEmApagar,
  aoCLicarEmSalvar,
  aoCLicarEmSalvarEFechar,
}: IFerramentasDeDetalhesProps) {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarBotaoSalvar && (
        <Button
          variant="contained"
          disableElevation
          color="primary"
          startIcon={<Icon>save</Icon>}
          onClick={aoCLicarEmSalvar}
        >
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarEFechar && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          startIcon={<Icon>save</Icon>}
          onClick={aoCLicarEmSalvarEFechar}
        >
          Salvar e voltar
        </Button>
      )}

      {mostrarBotaoApagar && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          startIcon={<Icon>delete</Icon>}
          onClick={aoCLicarEmApagar}
        >
          Apagar
        </Button>
      )}

      {mostrarBotaoNovo && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          startIcon={<Icon>add</Icon>}
          onClick={aoCLicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />

      {mostrarBotaoVoltar && (
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoCLicarEmVoltar}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
}
