import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { TarefasProvider } from "./context/TarefasContext";
import "./index.css";

/**
 * Ponto de Entrada da Aplicação:
 * - StrictMode: Executa checagens adicionais em desenvolvimento (ex: montagem dupla de efeitos).
 * - BrowserRouter: Gerencia a pilha de histórico e o roteamento cliente-side.
 * - TarefasProvider: Disponibiliza o estado global e persistência para toda a árvore.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TarefasProvider>
        <App />
      </TarefasProvider>
    </BrowserRouter>
  </StrictMode>
);
