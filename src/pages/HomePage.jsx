import { useContext } from "react";
import HabitList from "../components/HabitList";
import Panel from "../components/Panel";
import { HabitsContext } from "../context/HabitsContext";

/**
 * Página Inicial HomePage (Apostila - Seção 8.3: Criando páginas)
 *
 * Exibe o resumo do dia e a lista de hábitos ativos dentro de um painel.
 */
export default function HomePage() {
  const { habits, completedCount } = useContext(HabitsContext);

  return (
    <>
      <header className="hero">
        <p className="eyebrow">MY DAILY HABITS</p>
        <h1>Pequenos hábitos, progresso visível.</h1>
        <p>
          {completedCount} de {habits.length} hábitos concluídos.
        </p>
      </header>

      <Panel title="Hábitos de hoje">
        <HabitList />
      </Panel>
    </>
  );
}
