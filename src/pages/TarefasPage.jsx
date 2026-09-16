import FiltroCategoria from "../components/FiltroCategoria";
import ListaTarefas from "../components/ListaTarefas";
import Painel from "../components/Painel";

/**
 * Página TarefasPage:
 * - Exibida em /tarefas (rota index do TarefasLayout).
 * - Permite visualização completa com filtro de categoria.
 */
export default function TarefasPage() {
  return (
    <section className="tarefas-page">
      <div className="controls-bar">
        <FiltroCategoria />
      </div>

      <Painel title="Todas as Tarefas do Projeto">
        <ListaTarefas />
      </Painel>
    </section>
  );
}
