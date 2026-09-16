import { useContext } from "react";
import { TarefasContext } from "../context/TarefasContext";
import CartaoTarefa from "./CartaoTarefa";

/**
 * Componente ListaTarefas:
 * - Consome o TarefasContext.
 * - Renderiza estado vazio amigável quando não houver tarefas.
 * - Mapeia os dados usando key estável vinda do objeto (tarefa.id), nunca o índice.
 */
export default function ListaTarefas() {
  const context = useContext(TarefasContext);

  if (!context) {
    throw new Error("ListaTarefas precisa estar dentro de TarefasProvider.");
  }

  const { tarefasFiltradas, alternarTarefa, excluirTarefa } = context;

  if (tarefasFiltradas.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma tarefa encontrada para a seleção atual.</p>
      </div>
    );
  }

  return (
    <section className="task-grid" aria-label="Lista de tarefas do mutirão">
      {tarefasFiltradas.map((tarefa) => (
        <CartaoTarefa
          key={tarefa.id}
          id={tarefa.id}
          titulo={tarefa.titulo}
          categoria={tarefa.categoria}
          voluntarios={tarefa.voluntarios}
          concluida={tarefa.concluida}
          onToggle={alternarTarefa}
          onDelete={excluirTarefa}
        />
      ))}
    </section>
  );
}
