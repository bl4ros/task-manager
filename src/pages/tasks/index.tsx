import React from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TasksService } from "../../shared/services/api/tasks";

export function ListagemDeTasks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = React.useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  React.useEffect(() => {
    TasksService.getAll(1, busca).then((result) => {
      if (result instanceof Error) {
        return;
      } else {
        console.log(result);
      }
    });
  }, [busca]);

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
