import "./App.css";
import { Route, Routes } from "react-router";
import ProtectedProgressRoute from "./components/ProtectedProgressRoute";
import AppLayout from "./layouts/AppLayout";
import HabitsLayout from "./layouts/HabitsLayout";
import AboutPage from "./pages/AboutPage";
import HabitDetailsPage from "./pages/HabitDetailsPage";
import HabitsPage from "./pages/HabitsPage";
import HomePage from "./pages/HomePage";
import NewHabitPage from "./pages/NewHabitPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProgressPage from "./pages/ProgressPage";
import SuggestionsPage from "./pages/SuggestionsPage";

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
 */
export default function App() {
  return (
    <Routes>
      {/* Layout mestre compartilhado por todas as rotas */}
      <Route element={<AppLayout />}>
        {/* Rota inicial / */}
        <Route index element={<HomePage />} />

        {/* Rota de cadastro /novo */}
        <Route path="novo" element={<NewHabitPage />} />

        {/* Rotas aninhadas de hábitos com layout próprio */}
        <Route path="habitos" element={<HabitsLayout />}>
          <Route index element={<HabitsPage />} />
          <Route path=":habitId" element={<HabitDetailsPage />} />
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

        {/* Rota com integração HTTP /sugestoes */}
        <Route path="sugestoes" element={<SuggestionsPage />} />

        {/* Rota institucional /sobre */}
        <Route path="sobre" element={<AboutPage />} />

        {/* Rota de página não encontrada para URLs inexistentes */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
