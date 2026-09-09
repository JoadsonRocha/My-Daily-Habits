import { useContext, useEffect } from "react";
import "./App.css";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Panel from "./components/Panel";
import { HabitsContext } from "./context/HabitsContext";

/**
 * Componente Principal App (Apostila - Checkpoint da Aula 7, Páginas 49–50)
 *
 * Arquitetura Refatorada com useContext:
 * - O App não concentra mais o estado dos hábitos nem funções como handleAddHabit e handleToggleHabit.
 * - Toda a lógica de negócio e persistência reside agora dentro do HabitsProvider (src/context/HabitsContext.jsx).
 * - O App foca exclusivamente na composição visual da tela e na sincronização do título da aba.
 * - Elimina o prop drilling: <HabitForm /> e <HabitList /> consomem o contexto diretamente sem repasse de props!
 */
export default function App() {
  /**
   * Consumo do Contexto Compartilhado (Seção 7.4):
   * Lê 'habits' e o valor derivado 'completedCount' direto do HabitsContext.
   */
  const habitsContext = useContext(HabitsContext);

  // Verificação defensiva: assegura que App está dentro do HabitsProvider (definido em main.jsx)
  if (!habitsContext) {
    throw new Error("App precisa estar dentro de HabitsProvider.");
  }

  const { habits, completedCount } = habitsContext;

  /**
   * Sincronização do Título da Aba (Seção 6.4 e 7.5):
   * Atualiza document.title com a proporção de hábitos concluídos e limpa no cleanup.
   */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${completedCount}/${habits.length} hábitos concluídos`;

    return () => {
      document.title = previousTitle;
    };
  }, [completedCount, habits.length]);

  return (
    <main className="app">
      {/* Cabeçalho principal com o progresso atualizado via contexto */}
      <header className="hero">
        <p className="eyebrow">MY DAILY HABITS</p>
        <h1>Pequenos hábitos, progresso visível.</h1>
        <p>{completedCount} de {habits.length} hábitos concluídos.</p>
      </header>

      {/* 
        Painel de Cadastro:
        HabitForm não necessita mais de 'onAddHabit'; ele interage diretamente com o contexto!
      */}
      <Panel title="Novo hábito">
        <HabitForm />
      </Panel>

      {/* 
        Painel de Listagem:
        HabitList não necessita mais de 'habits' nem de 'onToggle'; consome diretamente o contexto!
      */}
      <Panel title="Hábitos de hoje">
        <HabitList />
      </Panel>
    </main>
  );
}
