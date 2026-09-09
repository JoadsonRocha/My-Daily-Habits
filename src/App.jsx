import { useState } from "react";
import "./App.css";
import HabitList from "./components/HabitList";
import Panel from "./components/Panel";
import { initialHabits } from "./data/habits";

/**
 * Componente Principal App (Apostila - Checkpoint da Aula 4, Página 29)
 *
 * Responsabilidades:
 * 1. Gerenciar o estado principal da aplicação (lista de hábitos) com useState.
 * 2. Calcular valores derivados em tempo de renderização (completedCount).
 * 3. Implementar a lógica de negócio para alternar o status do hábito sem mutação.
 * 4. Compor a estrutura da página combinando o cabeçalho e os componentes Panel e HabitList.
 */
export default function App() {
  /**
   * Estado com useState (Seção 4.1):
   * - habits: snapshot atual do array de hábitos usado nesta renderização.
   * - setHabits: função atualizadora fornecida pelo React para solicitar uma nova renderização com novos dados.
   * - initialHabits: valor inicial fornecido apenas na primeira montagem do componente.
   */
  const [habits, setHabits] = useState(initialHabits);

  /**
   * Valor Derivado (Seção 4.4: Fonte única da verdade):
   * - A quantidade de concluídos é calculada a partir de 'habits' durante cada renderização.
   * - Não criamos um estado separado (ex: const [count, setCount]) para evitar duplicidade e
   *   risco de descompasso de sincronização entre a contagem e a lista.
   */
  const completedCount = habits.filter(
    (habit) => habit.completed,
  ).length;

  /**
   * Atualização Imutável do Estado (Seção 4.2):
   * - Nunca mutamos o array original (evite habits[i].completed = true ou habits.push()).
   * - Usamos a forma funcional 'setHabits((currentHabits) => ...)' para garantir que estamos
   *   trabalhando com o valor mais recente do estado, mesmo se houver atualizações concorrentes.
   * - O método .map() percorre a lista e devolve um NOVO array. Para o item correspondente ao id,
   *   criamos um NOVO objeto com o spread {...habit} e invertemos 'completed'.
   *   Os demais hábitos são preservados intactos.
   */
  function handleToggleHabit(habitId) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    );
  }

  return (
    <main className="app">
      {/* Cabeçalho da aplicação (Hero) */}
      <header className="hero">
        <p className="eyebrow">MY DAILY HABITS</p>
        <h1>Pequenos hábitos, progresso visível.</h1>
        {/* Exibição em tempo real do progresso utilizando os valores derivados */}
        <p>
          {completedCount} de {habits.length} hábitos concluídos.
        </p>
      </header>

      {/* 
        Composição com Panel (Seção 3.4):
        - Passamos o título do painel como prop ("title").
        - O componente <HabitList /> é passado internamente como 'children'.
        - Passamos o estado 'habits' e a ação 'handleToggleHabit' via prop 'onToggle'.
      */}
      <Panel title="Hábitos de hoje">
        <HabitList habits={habits} onToggle={handleToggleHabit} />
      </Panel>
    </main>
  );
}
