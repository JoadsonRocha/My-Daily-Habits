import { useContext, useState } from "react";
import { HabitsContext } from "../context/HabitsContext";

/**
 * Componente HabitForm (Apostila - Seção 7.4: Consumindo com useContext)
 *
 * Responsabilidades:
 * - Obter a ação 'addHabit' diretamente do HabitsContext via useContext.
 * - Gerenciar localmente os campos controlados de entrada (title e goal).
 * - Validar os dados e despachar a criação do hábito para o Provider global.
 */
export default function HabitForm() {
  /**
   * Consumo do Contexto:
   * Obtém a referência do contexto e extrai a função de inserção de hábitos 'addHabit'.
   */
  const habitsContext = useContext(HabitsContext);

  // Verificação defensiva de presença do Provider
  if (!habitsContext) {
    throw new Error("HabitForm precisa estar dentro de HabitsProvider.");
  }

  const { addHabit } = habitsContext;

  // Estado local dos campos do formulário
  const [form, setForm] = useState({ title: "", goal: "" });

  // Estado local para mensagens de erro de validação
  const [error, setError] = useState("");

  /**
   * Handler de alteração dos inputs:
   * Sincroniza o valor digitado pelo usuário com o estado correspondente usando [name]: value.
   */
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  /**
   * Handler de submissão do formulário:
   * - Impede o reload da página com event.preventDefault().
   * - Valida o preenchimento de title e goal.
   * - Chama addHabit(...) do contexto para persistir o novo hábito.
   * - Limpa os campos do formulário e as mensagens de erro.
   */
  function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const goal = form.goal.trim();

    if (!title || !goal) {
      setError("Preencha o hábito e a meta.");
      return;
    }

    addHabit({
      id: crypto.randomUUID(),
      title,
      goal,
      completed: false,
    });

    setForm({ title: "", goal: "" });
    setError("");
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      {/* Campo: Hábito */}
      <div className="field">
        <label htmlFor="title">Hábito</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ex.: Ler"
        />
      </div>

      {/* Campo: Meta */}
      <div className="field">
        <label htmlFor="goal">Meta</label>
        <input
          id="goal"
          name="goal"
          value={form.goal}
          onChange={handleChange}
          placeholder="Ex.: 20 minutos"
        />
      </div>

      {/* Exibição condicional da mensagem de erro */}
      {error && <p className="form-error">{error}</p>}

      <button type="submit">Adicionar hábito</button>
    </form>
  );
}
