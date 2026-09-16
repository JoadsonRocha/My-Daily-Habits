import { NavLink, Outlet } from "react-router";

/**
 * Layout Principal da Aplicação AppLayout:
 * - Cabeçalho global com o nome autoral do painel.
 * - Barra de navegação com NavLink e a prop 'end' no link raiz para evitar falso positivo na classe active.
 * - Contêiner principal renderizando a rota ativa no Outlet.
 */
export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <strong>Mutirão do Bairro</strong>
          <span className="brand-subtitle">painel do Joadson</span>
        </div>

        <nav aria-label="Navegação principal">
          <NavLink to="/" end>
            Painel
          </NavLink>
          <NavLink to="/nova">Nova Tarefa</NavLink>
          <NavLink to="/tarefas">Tarefas</NavLink>
          <NavLink to="/relatorio">Relatório</NavLink>
          <NavLink to="/sugestoes">Sugestões</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>

      <main className="app">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          Mutirão do Bairro &bull; Capacitação em Desenvolvimento Full Stack ITEAM 2026 &bull; Desenvolvido por Joadson Rocha
        </p>
      </footer>
    </div>
  );
}
