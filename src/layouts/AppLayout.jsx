import { NavLink, Outlet } from "react-router";

/**
 * Layout Principal AppLayout (Apostila - Seção 9.3: Layout e Rotas Aninhadas)
 *
 * Responsabilidades:
 * - Estruturar o shell visual comum compartilhado por todas as páginas (cabeçalho, barra de navegação).
 * - Utilizar NavLink para criar links de navegação acessíveis que sabem se estão ativos ou não (classe 'active').
 * - Utilizar a prop 'end' no link raiz "/" para que não fique ativo em todas as sub-rotas.
 * - Renderizar o componente <Outlet /> no ponto exato onde a página da rota filha deve ser inserida.
 */
export default function AppLayout() {
  return (
    <div className="app-shell">
      {/* Barra de navegação superior da aplicação */}
      <header className="app-header">
        <strong>My Daily Habits</strong>
        <nav aria-label="Navegação principal">
          <NavLink to="/" end>
            Hoje
          </NavLink>
          <NavLink to="/novo">Novo hábito</NavLink>
          <NavLink to="/habitos">Hábitos</NavLink>
          <NavLink to="/progresso">Progresso</NavLink>
          <NavLink to="/sugestoes">Sugestões</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </header>

      {/* Container principal onde a rota ativa é renderizada através do Outlet */}
      <main className="app">
        <Outlet />
      </main>
    </div>
  );
}
