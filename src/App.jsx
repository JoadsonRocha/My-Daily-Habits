import { useEffect, useState } from "react";
import "./App.css";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Panel from "./components/Panel";
import { initialHabits } from "./data/habits";

/**
 * Chave de armazenamento no LocalStorage do navegador (Apostila - Seção 6.2)
 * Usamos um prefixo identificando o projeto para evitar conflito de chaves.
 */
const STORAGE_KEY = "my-daily-habits:habits";

/**
 * Função de Leitura Segura do LocalStorage (Apostila - Seção 6.2: Lazy Initialization):
 * - Lê os dados salvos previamente no navegador.
 * - Se não houver dados salvos, retorna os hábitos iniciais ('initialHabits').
 * - Utiliza bloco try/catch para proteger a aplicação contra JSON inválido ou corrompido,
 *   garantindo que nunca ocorra a famosa "tela branca" em caso de erro.
 * - Valida se o conteúdo interpretado é realmente um Array com Array.isArray().
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
 * Componente Principal App (Apostila - Checkpoint da Aula 6, Páginas 40–43)
 *
 * Responsabilidades:
 * 1. Inicializar e gerenciar o estado dos hábitos via useState com função preguiçosa.
 * 2. Sincronizar os dados com o LocalStorage via useEffect sempre que os hábitos mudarem.
 * 3. Atualizar o título do documento (aba do navegador) e registrar função de limpeza.
 * 4. Orquestrar as ações de adicionar novo hábito e alternar conclusão.
 * 5. Compor a interface em dois painéis: "Novo hábito" e "Hábitos de hoje".
 */
export default function App() {
  /**
   * Inicialização Preguiçosa do Estado (Seção 6.2):
   * Passar a referência 'loadHabits' (em vez de loadHabits()) faz com que o React execute
   * a leitura do LocalStorage apenas UMA vez, durante a montagem inicial do componente,
   * poupando processamento de leitura de disco em cada re-renderização.
   */
  const [habits, setHabits] = useState(loadHabits);

  /**
   * Valor Derivado (Seção 4.4):
   * Calcula dinamicamente quantos hábitos estão concluídos nesta renderização.
   */
  const completedCount = habits.filter(
    (habit) => habit.completed,
  ).length;

  /**
   * Efeito 1: Sincronização com o LocalStorage (Seção 6.3):
   * - Executa sempre que a referência do estado 'habits' mudar (declarada no array de dependências [habits]).
   * - Converte o array em string com JSON.stringify e persiste no navegador.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  /**
   * Efeito 2: Atualização do Título da Aba com Limpeza (Seção 6.4):
   * - Atualiza 'document.title' com a contagem de progresso.
   * - Função de limpeza (return () => { ... }): restaura o título anterior antes
   *   de o efeito executar novamente ou se o componente for desmontado.
   * - Dependências: [completedCount, habits.length], pois são as variáveis reativas lidas pelo efeito.
   */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${completedCount}/${habits.length} hábitos concluídos`;

    return () => {
      document.title = previousTitle;
    };
  }, [completedCount, habits.length]);

  /**
   * Handler para Adicionar Hábito (Seção 5.5):
   * - Recebe o novo objeto criado pelo HabitForm.
   * - Atualiza o array de estado de forma imutável, criando um novo array contendo
   *   todos os hábitos anteriores (...current) mais o novo objeto (newHabit).
   */
  function handleAddHabit(newHabit) {
    setHabits((current) => [...current, newHabit]);
  }

  /**
   * Handler para Alternar Status de Conclusão (Seção 4.2):
   * - Percorre os hábitos com .map() e inverte o booleano 'completed' do item selecionado.
   */
  function handleToggleHabit(habitId) {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    );
  }

  return (
    <main className="app">
      {/* Cabeçalho da aplicação (Hero) */}
      <header className="hero">
        <p className="eyebrow">MY DAILY HABITS</p>
        <h1>Pequenos hábitos, progresso visível.</h1>
        <p>{completedCount} de {habits.length} hábitos concluídos.</p>
      </header>

      {/* Painel 1: Formulário de Cadastro de Novo Hábito (Capítulo 5) */}
      <Panel title="Novo hábito">
        <HabitForm onAddHabit={handleAddHabit} />
      </Panel>

      {/* Painel 2: Lista dos Hábitos Cadastrados (Capítulo 3 e 4) */}
      <Panel title="Hábitos de hoje">
        <HabitList habits={habits} onToggle={handleToggleHabit} />
      </Panel>
    </main>
  );
}
