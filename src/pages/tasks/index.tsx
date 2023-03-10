import React from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { useDebounce } from "../../shared/hooks/useDebouce";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TasksService } from "../../shared/services/api/tasks";

export function ListagemDeTasks() {
  const { debounce } = useDebounce(3000);
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = React.useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  React.useEffect(() => {
    debounce(() => {
      TasksService.getAll(1, busca).then((result) => {
        if (result instanceof Error) {
          return;
        } else {
          console.log(result);
        }
      });
    });
  }, [busca, debounce]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de tasks"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    ></LayoutBaseDePagina>
  );
}
