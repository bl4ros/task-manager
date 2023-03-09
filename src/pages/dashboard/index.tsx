import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function Dashboard() {
  return (
    <LayoutBaseDePagina
      titulo="Página Inicial"
      barraDeFerramentas={
        <FerramentasDeDetalhes mostrarBotaoSalvarEFechar mostrarBotaoNovo />
      }
    >
      Testando
    </LayoutBaseDePagina>
  );
}
