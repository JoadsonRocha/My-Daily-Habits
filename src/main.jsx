import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { TarefasProvider } from "./context/TarefasContext";
import "./index.css";
import App from "./App";
import { HabitsProvider } from "./context/HabitsContext";

/**
 * Ponto de Entrada da Aplicação (Apostila - Seção 8.2: Instalação e Configuração do BrowserRouter)
 *
 * Arquitetura da Raiz:
 * 1. BrowserRouter: Fornece o contexto de roteamento, localização e histórico da web (History API)
 *    para toda a aplicação, permitindo navegação declarativa sem recarregar o documento HTML.
 * 2. HabitsProvider: Disponibiliza o contexto compartilhado de hábitos para todas as rotas e componentes.
 * 3. App: Contém a definição das rotas e layouts da aplicação.
 * Ponto de Entrada da Aplicação:
 * - StrictMode: Executa checagens adicionais em desenvolvimento (ex: montagem dupla de efeitos).
 * - BrowserRouter: Gerencia a pilha de histórico e o roteamento cliente-side.
 * - TarefasProvider: Disponibiliza o estado global e persistência para toda a árvore.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HabitsProvider>
      <TarefasProvider>
        <App />
      </HabitsProvider>
      </TarefasProvider>
    </BrowserRouter>
  </StrictMode>,
  </StrictMode>
);
