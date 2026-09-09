import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HabitsProvider } from "./context/HabitsContext";

/**
 * Ponto de Entrada da Aplicação (Apostila - Seção 7.3: Posicionando o Provider)
 *
 * - HabitsProvider: Envolve o componente App para fornecer o contexto de hábitos a toda a árvore.
 *   Dessa forma, qualquer componente filho (como HabitList, HabitForm ou App) pode
 *   acessar os hábitos e suas ações diretamente via useContext sem a necessidade de passar props intermediárias.
 * - StrictMode: Ajuda a identificar efeitos colaterais e más práticas em ambiente de desenvolvimento.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HabitsProvider>
      <App />
    </HabitsProvider>
  </StrictMode>,
);
