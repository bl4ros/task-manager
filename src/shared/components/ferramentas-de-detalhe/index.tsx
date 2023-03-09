import { Button, Divider, Icon, Paper, useTheme } from "@mui/material";
import { Box } from "@mui/system";

interface FerramentasDeDetalhesProps {}

export function FerramentasDeDetalhes(/* {}: FerramentasDeDetalhesProps */) {
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
      <Button
        variant="contained"
        disableElevation
        color="primary"
        startIcon={<Icon>save</Icon>}
      >
        Salvar
      </Button>

      <Button
        variant="outlined"
        disableElevation
        color="primary"
        startIcon={<Icon>save</Icon>}
      >
        Salvar e voltar
      </Button>
      <Button
        variant="outlined"
        disableElevation
        color="primary"
        startIcon={<Icon>delete</Icon>}
      >
        Apagar
      </Button>
      <Button
        variant="outlined"
        disableElevation
        color="primary"
        startIcon={<Icon>add</Icon>}
      >
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button
        variant="outlined"
        disableElevation
        color="primary"
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
    </Box>
  );
}
