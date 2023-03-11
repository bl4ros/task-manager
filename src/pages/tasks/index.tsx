import {
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks/useDebouce";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TasksService, IListagemTasks } from "../../shared/services/api/tasks";

export function ListagemDeTasks() {
  const { debounce } = useDebounce();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = React.useState<IListagemTasks[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const busca = React.useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = React.useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      TasksService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          return;
        } else {
          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, debounce, pagina]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de tasks"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.content}</TableCell>
                <TableCell>{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { busca, pagina: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
}
