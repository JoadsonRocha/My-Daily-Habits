import { createContext, useEffect, useState } from "react";
import { initialHabits } from "../data/habits";

/**
 * Chave de persistência no LocalStorage do navegador (Apostila - Seção 7.2)
 */
const STORAGE_KEY = "my-daily-habits:habits";

/**
 * Função utilitária de inicialização preguiçosa:
 * - Lê os hábitos gravados no localStorage com segurança.
 * - Caso ocorra erro de parsing ou o valor não seja um array, retorna 'initialHabits'.
 */
function loadHabits() {
  const savedHabits = localStorage.getItem(STORAGE_KEY);

  if (!savedHabits) return initialHabits;

  try {
    const parsedHabits = JSON.parse(savedHabits);
    return Array.isArray(parsedHabits) ? parsedHabits : initialHabits;
  } catch {
    return initialHabits;
  }
}

/**
 * Criação do Contexto de Hábitos (Apostila - Seção 7.2):
 * - createContext(null): Define o canal/canal de comunicação global para os hábitos.
 * - O valor padrão 'null' nos ajuda a identificar se algum componente tentou consumir o contexto
 *   fora da árvore coberta pelo HabitsProvider.
 */
export const HabitsContext = createContext(null);

/**
 * Componente HabitsProvider (Apostila - Seção 7.2):
 * - Encapsula todo o estado compartilhado da aplicação e os efeitos colaterais.
 * - Responsável por distribuir dados e ações para todos os componentes descendentes
 *   através da prop 'children', eliminando o repasse intermediário desnecessário (prop drilling).
 */
export function HabitsProvider({ children }) {
  /**
   * Estado dos hábitos centralizado no Provider:
   * Inicializado de forma preguiçosa com a função loadHabits.
   */
  const [habits, setHabits] = useState(loadHabits);

  /**
   * Valor Derivado:
   * Calcula dinamicamente o número de hábitos concluídos.
   */
  const completedCount = habits.filter(
    (habit) => habit.completed,
  ).length;

  /**
   * Sincronização com o LocalStorage via useEffect:
   * Sempre que o array 'habits' sofrer alterações, salva no navegador.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  /**
   * Ação para cadastrar novo hábito (Lifting state up):
   * Adiciona o item ao array preservando a imutabilidade com spread operator.
   */
  function addHabit(newHabit) {
    setHabits((current) => [...current, newHabit]);
  }

  /**
   * Ação para alternar status do hábito (Concluído / Pendente):
   * Mapeia o array e inverte a propriedade 'completed' do item correspondente.
   */
  function toggleHabit(habitId) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    );
  }

  /**
   * Objeto de valores expostos pelo Provider:
   * Reúne dados reativos e funções de controle para consumo via useContext.
   */
  const value = {
    habits,
    completedCount,
    addHabit,
    toggleHabit,
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
}
