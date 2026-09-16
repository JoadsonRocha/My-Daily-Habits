import { useContext } from "react";
import { Navigate } from "react-router";
import Painel from "../components/Painel";
import { TarefasContext } from "../context/TarefasContext";
import { CATEGORIAS_VALIDAS } from "../data/tarefas";

/**
 * Página de Relatório RelatorioPage (/relatorio):
 * - Condição de acesso didática: se não houver tarefas cadastradas, redireciona para /nova.
 * - Tratamento estrito para NUNCA exibir NaN em nenhum cálculo de percentual ou média.
 */
export default function RelatorioPage() {
  const context = useContext(TarefasContext);

  if (!context) {
    throw new Error("RelatorioPage precisa estar dentro de TarefasProvider.");
  }

  const { tarefas, concluidasCount, totalVoluntarios } = context;

  // Redirecionamento condicional caso não existam tarefas cadastradas
  if (tarefas.length === 0) {
    return <Navigate to="/nova" replace />;
  }

  // Prevenção contra NaN em divisões numéricas
  const total = tarefas.length;
  const porcentagemGeral = total > 0 ? Math.round((concluidasCount / total) * 100) : 0;
  const mediaVoluntarios = total > 0 ? (totalVoluntarios / total).toFixed(1) : "0.0";

  return (
    <section className="relatorio-page">
      <header className="page-header">
        <p className="eyebrow">RELATÓRIO DE IMPACTO</p>
        <h1>Progresso Geral do Mutirão</h1>
        <p>Acompanhamento analítico da mobilização e conclusão dos trabalhos.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-box highlight">
          <span className="stat-big">{porcentagemGeral}%</span>
          <span className="stat-title">Taxa de Conclusão Global</span>
          <p>{concluidasCount} de {total} tarefas concluídas</p>
        </div>

        <div className="stat-box">
          <span className="stat-big">{totalVoluntarios}</span>
          <span className="stat-title">Total de Voluntários</span>
          <p>Média de {mediaVoluntarios} voluntários por tarefa</p>
        </div>

        <div className="stat-box">
          <span className="stat-big">{total - concluidasCount}</span>
          <span className="stat-title">Ações Pendentes</span>
          <p>Demandas que ainda necessitam de esforço</p>
        </div>
      </div>

      <Painel title="Detalhamento por Área de Atuação">
        <div className="category-report-table">
          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Total de Ações</th>
                <th>Concluídas</th>
                <th>Voluntários</th>
                <th>Aproveitamento</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIAS_VALIDAS.map((cat) => {
                const itens = tarefas.filter((t) => t.categoria === cat.id);
                const qtd = itens.length;
                const concluidas = itens.filter((t) => t.concluida).length;
                const vols = itens.reduce((acc, t) => acc + (Number(t.voluntarios) || 0), 0);
                const pct = qtd > 0 ? Math.round((concluidas / qtd) * 100) : 0;

                return (
                  <tr key={cat.id}>
                    <td>
                      <span className={`category-badge category-${cat.id}`}>
                        {cat.rotulo}
                      </span>
                    </td>
                    <td>{qtd}</td>
                    <td>{concluidas}</td>
                    <td>{vols}</td>
                    <td><strong>{pct}%</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Painel>
    </section>
  );
}

