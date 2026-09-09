import { Link } from "react-router";

/**
 * Componente HabitCard (Apostila - Seção 9.2: Ligando o cartão à página de detalhes)
 *
 * Responsabilidades:
 * - Renderizar dados do hábito individual (título, meta, status).
 * - Fornecer um Link do react-router para navegação cliente-side até a rota dinâmica "/habitos/:habitId".
 * - Botão para alternar status via callback 'onToggle' acionando o contexto global.
 */
export default function HabitCard({
  id,
  title,
  goal = "Sem meta definida",
  completed,
  onToggle,
}) {
  return (
    <article className={`habit-card ${completed ? "is-complete" : ""}`}>
      <div>
        <h2>{title}</h2>
        <p>Meta: {goal}</p>
        {/* Link interno da SPA que não reinicia o estado nem recarrega o HTML */}
        <Link to={`/habitos/${id}`}>Ver detalhes</Link>
      </div>

      <button type="button" onClick={() => onToggle(id)}>
        {completed ? "Desmarcar" : "Concluir"}
      </button>
    </article>
  );
}
