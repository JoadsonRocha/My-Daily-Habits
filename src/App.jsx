import "./App.css";
import { Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import TarefasLayout from "./layouts/TarefasLayout";
import DetalhesTarefaPage from "./pages/DetalhesTarefaPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NovaTarefaPage from "./pages/NovaTarefaPage";
import RelatorioPage from "./pages/RelatorioPage";
import SobrePage from "./pages/SobrePage";
import SugestoesPage from "./pages/SugestoesPage";
import TarefasPage from "./pages/TarefasPage";

/**
 * Componente Raiz App — Árvore Exata de Rotas da Atividade Final:
 * 1. /              -> Painel do dia
 * 2. /nova          -> Cadastro
 * 3. /tarefas       -> Lista completa (rota aninhada pai com layout próprio)
 *    /tarefas/:id   -> Detalhes da tarefa
 * 4. /relatorio     -> Relatório com condição de acesso
 * 5. /sugestoes     -> Sugestões vindas da API externa
 * 6. /sobre         -> Sobre o projeto e marcador de autoria
 * 7. *              -> Rota 404 (página não encontrada)
 */
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Rota 1: Raiz / */}
        <Route index element={<HomePage />} />

        {/* Rota 2: Cadastro /nova */}
        <Route path="nova" element={<NovaTarefaPage />} />

        {/* Rota 3: Rotas aninhadas de tarefas /tarefas */}
        <Route path="tarefas" element={<TarefasLayout />}>
          <Route index element={<TarefasPage />} />
          <Route path=":tarefaId" element={<DetalhesTarefaPage />} />
        </Route>

        {/* Rota 4: Relatório analítico com condição de acesso /relatorio */}
        <Route path="relatorio" element={<RelatorioPage />} />

        {/* Rota 5: Integração de rede com 4 estados /sugestoes */}
        <Route path="sugestoes" element={<SugestoesPage />} />

        {/* Rota 6: Institucional e autoria /sobre */}
        <Route path="sobre" element={<SobrePage />} />

        {/* Rota 7: Tratamento de rotas inexistentes * */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
