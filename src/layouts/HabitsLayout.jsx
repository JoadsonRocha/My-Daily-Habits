import { Outlet } from "react-router";

/**
 * Layout de Hábitos HabitsLayout (Apostila - Seção 9.3: Rotas Aninhadas)
 *
 * Responsabilidades:
 * - Define a moldura visual compartilhada para a seção "/habitos".
 * - Inclui o cabeçalho de rotina ("MINHA ROTINA - Hábitos").
 * - O elemento <Outlet /> renderiza dinamicamente:
 *   - A listagem geral de hábitos quando na rota index ("/habitos").
 *   - A página de detalhes quando em "/habitos/:habitId".
 */
export default function HabitsLayout() {
  return (
    <section>
      <p className="eyebrow">MINHA ROTINA</p>
      <h1>Hábitos</h1>
      <Outlet />
    </section>
  );
}
