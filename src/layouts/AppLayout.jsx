import { NavLink, Outlet } from "react-router";

/**
 * Layout Principal AppLayout (Apostila - Seção 9.3: Layout e Rotas Aninhadas)
 *
 * Responsabilidades:
 * - Estruturar o shell visual comum compartilhado por todas as páginas (cabeçalho, barra de navegação).
 * - Utilizar NavLink para criar links de navegação acessíveis que sabem se estão ativos ou não (classe 'active').
 * - Utilizar a prop 'end' no link raiz "/" para que não fique ativo em todas as sub-rotas.
 * - Renderizar o componente <Outlet /> no ponto exato onde a página da rota filha deve ser inserida.
 * Layout Principal da Aplicação AppLayout:
 * - Cabeçalho global com o nome autoral do painel.
 * - Barra de navegação com NavLink e a prop 'end' no link raiz para evitar falso positivo na classe active.
 * - Contêiner principal renderizando a rota ativa no Outlet.
 */
export default function AppLayout() {
  return (
    <div className="app-shell">
      {/* Barra de navegação superior da aplicação */}
      <header className="app-header">
        <strong>My Daily Habits</strong>
        <div className="brand">
          <strong>Mutirão do Bairro</strong>
          <span className="brand-subtitle">painel do Joadson</span>
        </div>

        <nav aria-label="Navegação principal">
          <NavLink to="/" end>
            Hoje
            Painel
          </NavLink>
          <NavLink to="/novo">Novo hábito</NavLink>
          <NavLink to="/habitos">Hábitos</NavLink>
          <NavLink to="/progresso">Progresso</NavLink>
          <NavLink to="/nova">Nova Tarefa</NavLink>
          <NavLink to="/tarefas">Tarefas</NavLink>
          <NavLink to="/relatorio">Relatório</NavLink>
          <NavLink to="/sugestoes">Sugestões</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>

      {/* Container principal onde a rota ativa é renderizada através do Outlet */}
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
