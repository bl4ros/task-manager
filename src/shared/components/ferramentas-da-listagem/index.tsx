import { Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Environment } from "../../environment";

interface FerramentasDaListagemProps {
  children?: React.ReactNode;
  mostrarInputBusca?: boolean;
  textoDaBusca?: string;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  mostrarBotaoNovo?: boolean;
  textoBotaoNovo?: string;
  aoClicarEmNovo?: () => void;
}

export function FerramentasDaListagem({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,

  mostrarBotaoNovo = true,
  textoBotaoNovo = "Novo",
  aoClicarEmNovo,
}: FerramentasDaListagemProps) {
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          placeholder={Environment.INPUT_DE_BUSCA}
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            disableElevation
            color="primary"
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
}
