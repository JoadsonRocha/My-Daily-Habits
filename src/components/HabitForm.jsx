import { useContext, useState } from "react";
import { HabitsContext } from "../context/HabitsContext";

/**
 * Componente HabitForm (Apostila - Seção 9.4: Navegação após cadastro)
 *
 * Responsabilidades:
 * - Controlar os inputs de cadastro com 'value' e 'onChange'.
 * - Inserir o novo hábito através da ação 'addHabit' do HabitsContext.
 * - Suportar o callback opcional 'onSuccess': permite que a página que invocou o formulário
 *   decida o que fazer após o sucesso (ex: redirecionar via navigate("/")).
 */
export default function HabitForm({ onSuccess }) {
  const habitsContext = useContext(HabitsContext);

  if (!habitsContext) {
    throw new Error("HabitForm precisa estar dentro de HabitsProvider.");
  }

  const { addHabit } = habitsContext;

  const [form, setForm] = useState({ title: "", goal: "" });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const goal = form.goal.trim();

    if (!title || !goal) {
      setError("Preencha o hábito e a meta.");
      return;
    }

    // Adiciona o novo hábito ao estado global do contexto
    addHabit({
      id: crypto.randomUUID(),
      title,
      goal,
      completed: false,
    });

    setForm({ title: "", goal: "" });
    setError("");

    // Executa a navegação programática ou ação customizada caso fornecida
    onSuccess?.();
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
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

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Adicionar hábito</button>
    </form>
  );
}
