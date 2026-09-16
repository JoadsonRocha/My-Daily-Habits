import { useContext } from "react";
import FiltroCategoria from "../components/FiltroCategoria";
import ListaTarefas from "../components/ListaTarefas";
import Painel from "../components/Painel";
import { TarefasContext } from "../context/TarefasContext";

/**
 * Página Inicial HomePage (Painel do Dia):
 * - Identificação autoral com o nome do aluno.
 * - Resumo geral do mutirão com contadores derivados.
 * - Filtro dinâmico por categoria e listagem das tarefas ativas.
 */
export default function HomePage() {
  const { tarefas, concluidasCount, totalVoluntarios } = useContext(TarefasContext);

  const percentualConcluido =
    tarefas.length === 0
      ? 0
      : Math.round((concluidasCount / tarefas.length) * 100);

  return (
    <>
      <header className="hero">
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

      <div className="controls-bar">
        <FiltroCategoria />
      </div>

      <Painel title="Tarefas do Mutirão">
        <ListaTarefas />
      </Painel>
    </>
  );
}
