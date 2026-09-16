import "./App.css";
import { Route, Routes } from "react-router";
import ProtectedProgressRoute from "./components/ProtectedProgressRoute";
import AppLayout from "./layouts/AppLayout";
import HabitsLayout from "./layouts/HabitsLayout";
import AboutPage from "./pages/AboutPage";
import HabitDetailsPage from "./pages/HabitDetailsPage";
import HabitsPage from "./pages/HabitsPage";
import TarefasLayout from "./layouts/TarefasLayout";
import DetalhesTarefaPage from "./pages/DetalhesTarefaPage";
import HomePage from "./pages/HomePage";
import NewHabitPage from "./pages/NewHabitPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProgressPage from "./pages/ProgressPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import NovaTarefaPage from "./pages/NovaTarefaPage";
import RelatorioPage from "./pages/RelatorioPage";
import SobrePage from "./pages/SobrePage";
import SugestoesPage from "./pages/SugestoesPage";
import TarefasPage from "./pages/TarefasPage";

/**
 * Componente Raiz App - Árvore Completa de Rotas (Apostila - Capítulos 8 a 11)
 *
 * Estrutura Hierárquica Declarativa do React Router:
 * 1. <Route element={<AppLayout />}>: Rota de layout mestre que compartilha o cabeçalho e navegação.
 *    - index: Rota raiz "/" renderizando <HomePage />.
 *    - "novo": Rota "/novo" para formulário de novo hábito.
 *    - "habitos": Rota aninhada com HabitsLayout:
 *       * index: Rota "/habitos" exibindo a listagem completa.
 *       * ":habitId": Rota dinâmica "/habitos/:habitId" com parâmetro de URL para detalhes.
 *    - "progresso": Rota "/progresso" encapsulada pelo guard didático <ProtectedProgressRoute>.
 *    - "sugestoes": Rota "/sugestoes" consumindo API externa com AbortController.
 *    - "sobre": Rota estática informativa "/sobre".
 *    - "*": Rota curinga (catch-all) que exibe a página 404 para qualquer URL inválida.
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
      {/* Layout mestre compartilhado por todas as rotas */}
      <Route element={<AppLayout />}>
        {/* Rota inicial / */}
        {/* Rota 1: Raiz / */}
        <Route index element={<HomePage />} />

        {/* Rota de cadastro /novo */}
        <Route path="novo" element={<NewHabitPage />} />
        {/* Rota 2: Cadastro /nova */}
        <Route path="nova" element={<NovaTarefaPage />} />

        {/* Rotas aninhadas de hábitos com layout próprio */}
        <Route path="habitos" element={<HabitsLayout />}>
          <Route index element={<HabitsPage />} />
          <Route path=":habitId" element={<HabitDetailsPage />} />
        {/* Rota 3: Rotas aninhadas de tarefas /tarefas */}
        <Route path="tarefas" element={<TarefasLayout />}>
          <Route index element={<TarefasPage />} />
          <Route path=":tarefaId" element={<DetalhesTarefaPage />} />
        </Route>

        {/* Rota protegida de progresso /progresso */}
        <Route
          path="progresso"
          element={
            <ProtectedProgressRoute>
              <ProgressPage />
            </ProtectedProgressRoute>
          }
        />
        {/* Rota 4: Relatório analítico com condição de acesso /relatorio */}
        <Route path="relatorio" element={<RelatorioPage />} />

        {/* Rota com integração HTTP /sugestoes */}
        <Route path="sugestoes" element={<SuggestionsPage />} />
        {/* Rota 5: Integração de rede com 4 estados /sugestoes */}
        <Route path="sugestoes" element={<SugestoesPage />} />

        {/* Rota institucional /sobre */}
        <Route path="sobre" element={<AboutPage />} />
        {/* Rota 6: Institucional e autoria /sobre */}
        <Route path="sobre" element={<SobrePage />} />

        {/* Rota de página não encontrada para URLs inexistentes */}
        {/* Rota 7: Tratamento de rotas inexistentes * */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
