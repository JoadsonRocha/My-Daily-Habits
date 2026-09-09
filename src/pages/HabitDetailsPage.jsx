import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { HabitsContext } from "../context/HabitsContext";

/**
 * Página de Detalhes HabitDetailsPage (Apostila - Seção 9.1: Segmentos Dinâmicos)
 *
 * Conceitos aplicados:
 * - useParams: Extrai o parâmetro dinâmico ':habitId' definido no caminho da rota (/habitos/:habitId).
 * - useNavigate: Permite navegar via código, como 'navigate(-1)' para retornar à página anterior no histórico.
 * - Tratamento de não encontrado: Se o id não corresponder a nenhum hábito, exibe feedback e link para retornar.
 */
export default function HabitDetailsPage() {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits } = useContext(HabitsContext);

  // Localiza o hábito pelo ID recebido na URL
  const habit = habits.find((item) => item.id === habitId);

  // Caso o ID não exista ou tenha sido digitado incorretamente
  if (!habit) {
    return (
      <section>
        <h1>Hábito não encontrado</h1>
        <Link to="/habitos">Voltar à lista</Link>
      </section>
    );
  }

  return (
    <article>
      <p className="eyebrow">DETALHES DO HÁBITO</p>
      <h1>{habit.title}</h1>
      <p>Meta: {habit.goal}</p>
      <p>Status: {habit.completed ? "Concluído" : "Pendente"}</p>

      {/* Botão com navegação programática para voltar um passo no histórico */}
      <button type="button" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </article>
  );
}
