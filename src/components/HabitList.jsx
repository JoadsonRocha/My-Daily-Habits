import HabitCard from "./HabitCard";

/**
 * Componente HabitList (Apostila - Seção 2.5 e 4.3: Listas, Chaves e Repasse de Callbacks)
 *
 * Responsável por renderizar a coleção de cartões de hábitos:
 * - Recebe o array `habits` e a função callback `onToggle`.
 * - Trata o estado vazio através de renderização condicional inicial (guard clause).
 * - Itera sobre o array com `.map()` gerando componentes <HabitCard />.
 * - Utiliza chaves únicas e estáveis (`key={habit.id}`) para reconciliação no React.
 * - Encaminha a função de callback `onToggle` para cada item filho.
 */
export default function HabitList({ habits, onToggle }) {
  // Renderização condicional: caso a lista esteja vazia, exibe mensagem informativa
  if (habits.length === 0) {
    return <p>Nenhum hábito cadastrado.</p>;
  }

  return (
    <section className="habit-list" aria-label="Hábitos de hoje">
      {/* 
        Transformação de dados em elementos visuais com .map():
        - Cada item do array 'habits' é transformado em um componente <HabitCard />.
        - key={habit.id}: Obrigatório no React para identificar cada elemento de forma única e estável.
          Evita re-renderizações desnecessárias e problemas de sincronização do DOM.
        - {...habit}: Spread operator que espalha as propriedades do objeto (id, title, goal, completed)
          diretamente como props individuais para o HabitCard.
        - onToggle={onToggle}: Encaminha o callback para permitir que o card avise quando foi clicado.
      */}
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          {...habit}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}
