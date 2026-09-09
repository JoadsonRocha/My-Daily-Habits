import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * Ponto de Entrada da Aplicação (Apostila - Seção 1.5: Estrutura do projeto)
 *
 * - createRoot: Conecta a aplicação React ao elemento DOM raiz com id="root" presente em index.html.
 * - StrictMode: Ferramenta de desenvolvimento do React que ativa verificações e avisos adicionais
 *   para identificar potenciais problemas no ciclo de vida e renderização.
 * - Renderiza o componente principal <App /> dentro da árvore.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
