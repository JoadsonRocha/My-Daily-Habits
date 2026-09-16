import { useContext } from "react";
import HabitList from "../components/HabitList";
import Panel from "../components/Panel";
import { HabitsContext } from "../context/HabitsContext";
import FiltroCategoria from "../components/FiltroCategoria";
import ListaTarefas from "../components/ListaTarefas";
import Painel from "../components/Painel";
import { TarefasContext } from "../context/TarefasContext";

/**
 * Página Inicial HomePage (Apostila - Seção 8.3: Criando páginas)
 *
 * Exibe o resumo do dia e a lista de hábitos ativos dentro de um painel.
 * Página Inicial HomePage (Painel do Dia):
 * - Identificação autoral com o nome do aluno.
 * - Resumo geral do mutirão com contadores derivados.
 * - Filtro dinâmico por categoria e listagem das tarefas ativas.
 */
export default function HomePage() {
  const { habits, completedCount } = useContext(HabitsContext);
  const { tarefas, concluidasCount, totalVoluntarios } = useContext(TarefasContext);

  const percentualConcluido =
    tarefas.length === 0
      ? 0
      : Math.round((concluidasCount / tarefas.length) * 100);

  return (
    <>
      <header className="hero">
        <p className="eyebrow">MY DAILY HABITS</p>
        <h1>Pequenos hábitos, progresso visível.</h1>
        <p>
          {completedCount} de {habits.length} hábitos concluídos.
        <p className="eyebrow">MUTIRÃO DO BAIRRO</p>
        <h1>Painel do Joadson</h1>
        <p className="hero-description">
          Organização comunitária para transformação e melhoria do nosso bairro.
        </p>

        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">{tarefas.length}</span>
            <span className="stat-label">Tarefas no total</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">{concluidasCount}</span>
            <span className="stat-label">Concluídas ({percentualConcluido}%)</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">{totalVoluntarios}</span>
            <span className="stat-label">Voluntários mobilizados</span>
          </div>
        </div>
      </header>

      <Panel title="Hábitos de hoje">
        <HabitList />
      </Panel>
      <div className="controls-bar">
        <FiltroCategoria />
      </div>

      <Painel title="Tarefas do Mutirão">
        <ListaTarefas />
      </Painel>
    </>
  );
}
