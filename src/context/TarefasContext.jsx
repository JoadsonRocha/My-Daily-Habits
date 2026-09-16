import { createContext, useEffect, useState } from "react";
import { tarefasIniciais } from "../data/tarefas";

const STORAGE_KEY = "mutirao-do-bairro:tarefas";

/**
 * Leitura inicial preguiçosa com tratamento defensivo.
 * // usei try/catch aqui no carregamento para que, caso o dado salvo no navegador esteja corrompido, a aplicação retorne aos dados iniciais sem gerar tela branca
 */
function loadTarefas() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (!salvo) return tarefasIniciais;

  try {
    const parsed = JSON.parse(salvo);
    return Array.isArray(parsed) ? parsed : tarefasIniciais;
  } catch {
    return tarefasIniciais;
  }
}

export const TarefasContext = createContext(null);

export function TarefasProvider({ children }) {
  const [tarefas, setTarefas] = useState(loadTarefas);
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  // deixei a contagem de tarefas concluídas como valor derivado porque guardar dois estados me deu bug de sincronização na Aula 4
  const concluidasCount = tarefas.filter((t) => t.concluida).length;

  // Valor derivado para o total de voluntários engajados nas tarefas
  const totalVoluntarios = tarefas.reduce(
    (acc, t) => acc + (Number(t.voluntarios) || 0),
    0
  );

  // Lista filtrada derivada com base na categoria selecionada
  const tarefasFiltradas =
    categoriaFiltro === "todas"
      ? tarefas
      : tarefas.filter((t) => t.categoria === categoriaFiltro);

  // Sincronização segura com o LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch {
      // Prevenção caso exceda cota de armazenamento
    }
  }, [tarefas]);

  // Efeito do título da aba com função de limpeza que restaura o título anterior
  useEffect(() => {
    const tituloAnterior = document.title;
    document.title = `Mutirão (${concluidasCount}/${tarefas.length} concluídas)`;

    return () => {
      document.title = tituloAnterior;
    };
  }, [concluidasCount, tarefas.length]);

  function adicionarTarefa(novaTarefa) {
    setTarefas((current) => [...current, novaTarefa]);
  }

  function alternarTarefa(id) {
    setTarefas((current) =>
      current.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  }

  function excluirTarefa(id) {
    setTarefas((current) => current.filter((tarefa) => tarefa.id !== id));
  }

  const value = {
    tarefas,
    tarefasFiltradas,
    categoriaFiltro,
    setCategoriaFiltro,
    concluidasCount,
    totalVoluntarios,
    adicionarTarefa,
    alternarTarefa,
    excluirTarefa,
  };

  return (
    <TarefasContext.Provider value={value}>
      {children}
    </TarefasContext.Provider>
  );
}

