/**
 * Componente HabitCard (Apostila - Capítulos 2, 3 e 4)
 *
 * Responsável por renderizar as informações de um único hábito:
 * - Seção 2.1 e 2.4: Extração de componente e recebimento de dados via props.
 * - Seção 3.1: Desestruturação de props na assinatura da função e valor padrão (`goal = "Sem meta definida"`).
 * - Seção 3.3 e 4.3: Comunicação filho para pai por callback (`onToggle`).
 * - Seção 4.3: Feedback visual dinâmico com base no estado `completed`.
 */
export default function HabitCard({
  id,
  title,
  goal = "Sem meta definida", // Valor padrão caso a prop 'goal' seja undefined
  completed,
  onToggle, // Função callback recebida do componente ancestral (App)
}) {
  return (
    // Renderização condicional de classe CSS:
    // Se completed for verdadeiro, adiciona a classe "is-complete" para estilização (borda/fundo verde).
    <article className={`habit-card ${completed ? "is-complete" : ""}`}>
      <div>
        {/* Interpolação de valores JavaScript dentro do JSX usando chaves {} */}
        <h2>{title}</h2>
        <p>Meta: {goal}</p>
      </div>

      {/* 
        Botão de interação:
        - onClick={() => onToggle(id)}: Usa arrow function para NÃO executar a função
          imediatamente na renderização, mas sim aguardar o clique do usuário passando o 'id' correto.
        - Operador ternário ({completed ? "Desmarcar" : "Concluir"}):
          Alterna dinamicamente o texto exibido no botão dependendo do status atual do hábito.
      */}
      <button type="button" onClick={() => onToggle(id)}>
        {completed ? "Desmarcar" : "Concluir"}
      </button>
    </article>
  );
}
