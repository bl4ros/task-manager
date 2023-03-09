import { BarraDeFerramentas } from "../../shared/components/barra-de-ferramentas";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function Dashboard() {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={
        <BarraDeFerramentas mostrarInputBusca={true} textoBotaoNovo="Novo" />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
}
