import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { TarefasContext } from "../context/TarefasContext";

/**
 * Página de Detalhes DetalhesTarefaPage:
 * - Segmento dinâmico com useParams(:tarefaId).
 * - Tratamento para IDs inválidos ou inexistentes.
 * - Dois tipos de navegação requeridos pelo critério de aceite:
 *   1. Navegação no histórico com navigate(-1).
 *   2. Navegação para destino fixo com Link para /tarefas.
 */
export default function DetalhesTarefaPage() {
  const { tarefaId } = useParams();
  const navigate = useNavigate();
  const context = useContext(TarefasContext);

  if (!context) {
    throw new Error("DetalhesTarefaPage precisa estar dentro de TarefasProvider.");
  }

  const { tarefas, alternarTarefa, excluirTarefa } = context;

  const tarefa = tarefas.find((item) => item.id === tarefaId);

  if (!tarefa) {
    return (
      <section className="not-found-card" role="alert">
        <h2>Tarefa não encontrada</h2>
        <p>A tarefa com identificador "{tarefaId}" não existe ou foi removida do mutirão.</p>
        <Link to="/tarefas" className="btn-secondary">
          Voltar para a lista completa de tarefas
        </Link>
      </section>
    );
  }

  function handleExcluir() {
    excluirTarefa(tarefa.id);
    navigate("/tarefas");
  }

  return (
    <article className="task-details-card">
      <div className="details-header">
        <span className={`category-badge category-${tarefa.categoria}`}>
          {tarefa.categoria}
        </span>
        <span className="task-status">
          {tarefa.concluida ? "✓ Concluída" : "⏳ Pendente"}
        </span>
      </div>

      <h1 className="details-title">{tarefa.titulo}</h1>

      <div className="details-meta">
        <p>
          <strong>Identificador estável:</strong> <code>{tarefa.id}</code>
        </p>
        <p>
          <strong>Voluntários mobilizados:</strong> {tarefa.voluntarios}{" "}
          {tarefa.voluntarios === 1 ? "pessoa" : "pessoas"}
        </p>
        <p>
          <strong>Situação atual:</strong>{" "}
          {tarefa.concluida
            ? "Ação concluída pelos voluntários"
            : "Ação aguardando execução no mutirão"}
        </p>
      </div>

      <div className="details-actions">
        <button
          type="button"
          className="btn-toggle"
          onClick={() => alternarTarefa(tarefa.id)}
        >
          {tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={handleExcluir}
        >
          Excluir esta tarefa
        </button>
      </div>

      <hr className="details-divider" />

      {/* Demonstração dos dois tipos de navegação requeridos pelo critério de aceite */}
      <div className="navigation-options">
        <button
          type="button"
          className="btn-history-back"
          onClick={() => navigate(-1)}
        >
          ← Voltar uma página no histórico
        </button>

        <Link to="/tarefas" className="link-fixed-destination">
          Ver todas as tarefas (destino fixo) →
        </Link>
      </div>
    </article>
  );
}
