import { Link } from "react-router";

/**
 * Componente CartaoTarefa:
 * - Recebe props somente leitura e emite eventos via callbacks (onToggle, onDelete).
 * - Renderização condicional para itens concluídos vs pendentes.
 * - Chave de navegação interna com Link para a rota dinâmica /tarefas/:tarefaId.
 */
export default function CartaoTarefa({
  id,
  titulo,
  categoria,
  voluntarios,
  concluida,
  onToggle,
  onDelete,
}) {
  return (
    <article className={`task-card ${concluida ? "is-complete" : "is-pending"}`}>
      <div className="task-header">
        <span className={`category-badge category-${categoria}`}>
          {categoria}
        </span>
        <span className="volunteers-tag">
          👤 {voluntarios} {voluntarios === 1 ? "voluntário" : "voluntários"}
        </span>
      </div>

      <h3 className="task-title">{titulo}</h3>

      <div className="task-footer">
        <span className="task-status">
          {concluida ? "✓ Concluída" : "⏳ Pendente"}
        </span>

        <Link to={`/tarefas/${id}`} className="task-link">
          Ver detalhes
        </Link>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn-toggle"
          onClick={() => onToggle(id)}
        >
          {concluida ? "Desmarcar" : "Marcar como concluída"}
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(id)}
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
