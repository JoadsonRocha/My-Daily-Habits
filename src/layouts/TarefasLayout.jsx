import { Outlet } from "react-router";

/**
 * Layout de Tarefas TarefasLayout:
 * - Rota pai para /tarefas e sub-rotas como /tarefas/:tarefaId.
 * - Fornece contexto de navegação secundário e renderiza o conteúdo filho no Outlet.
 */
export default function TarefasLayout() {
  return (
    <div className="tarefas-layout">
      <div className="section-banner">
        <p className="eyebrow">ATIVIDADES COLETIVAS</p>
        <h2>Quadro Geral de Ações Comunitárias</h2>
      </div>

      <Outlet />
    </div>
  );
}

