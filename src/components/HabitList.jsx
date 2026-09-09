import { useContext } from "react";
import { HabitsContext } from "../context/HabitsContext";
import HabitCard from "./HabitCard";

/**
 * Componente HabitList (Apostila - Seção 7.4: Consumindo com useContext)
 *
 * Responsabilidades:
 * - Obter a lista de hábitos e a ação 'toggleHabit' diretamente do HabitsContext.
 * - Eliminar o prop drilling (não precisa mais receber habits nem onToggle via props do pai).
 * - Garantir a integridade verificando se está sendo executado sob o HabitsProvider.
 * - Renderizar a coleção mapeada para componentes <HabitCard />.
 */
export default function HabitList() {
  /**
   * Consumo do Contexto via useContext:
   * Acessa os valores fornecidos pelo HabitsProvider mais próximo na árvore de componentes.
   */
  const habitsContext = useContext(HabitsContext);

  // Verificação defensiva: lança erro explícito se o componente for usado fora do Provider
  if (!habitsContext) {
    throw new Error("HabitList precisa estar dentro de HabitsProvider.");
  }

  const { habits, toggleHabit } = habitsContext;

  // Renderização condicional para caso de lista vazia
  if (habits.length === 0) {
    return <p>Nenhum hábito cadastrado.</p>;
  }

  return (
    <section className="habit-list" aria-label="Hábitos de hoje">
      {/* 
        Mapeamento dos hábitos para componentes HabitCard:
        - key={habit.id}: chave de reconciliação única.
        - {...habit}: distribui as propriedades do objeto (id, title, goal, completed) como props.
        - onToggle={toggleHabit}: conecta a ação do card diretamente à função do contexto.
      */}
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          {...habit}
          onToggle={toggleHabit}
        />
      ))}
    </section>
  );
}
