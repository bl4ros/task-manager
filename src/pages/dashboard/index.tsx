import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function Dashboard() {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={
        <FerramentasDaListagem mostrarInputBusca={true} textoBotaoNovo="Novo" />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
}
