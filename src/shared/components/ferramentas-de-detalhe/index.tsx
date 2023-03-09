import {
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

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

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

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
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
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

      {mostrarBotaoSalvarCarregando && <Skeleton width={108} height={60} />}

      {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && (
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

      {mostrarBotaoSalvarEFecharCarregando && (
        <Skeleton width={177} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
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

      {mostrarBotaoApagarCarregando && <Skeleton width={108} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && (
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

      {mostrarBotaoNovoCarregando && <Skeleton width={108} height={60} />}

      <Divider variant="middle" orientation="vertical" />

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
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

      {mostrarBotaoVoltarCarregando && <Skeleton width={108} height={60} />}
    </Box>
  );
}
