import { useContext, useState } from "react";
import { TarefasContext } from "../context/TarefasContext";
import { CATEGORIAS_VALIDAS } from "../data/tarefas";

/**
 * Componente FormularioTarefa:
 * - Formulário 100% controlado pelo estado.
 * - Suporta select controlado (value no select) e checkbox controlada (checked no input).
 * - Validação em tempo de submissão exibindo mensagem na tela sem uso de alert().
 */
export default function FormularioTarefa({ onSuccess }) {
  const context = useContext(TarefasContext);

  if (!context) {
    throw new Error("FormularioTarefa precisa estar dentro de TarefasProvider.");
  }

  const { adicionarTarefa } = context;

  const [form, setForm] = useState({
    titulo: "",
    categoria: "limpeza",
    voluntarios: 1,
    concluida: false,
  });

  const [erro, setErro] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const tituloTratado = form.titulo.trim();
    const voluntariosNum = Number(form.voluntarios);

    if (!tituloTratado) {
      setErro("O título da tarefa é obrigatório.");
      return;
    }

    if (isNaN(voluntariosNum) || voluntariosNum <= 0) {
      setErro("O número de voluntários deve ser maior que zero.");
      return;
    }

    // Cria a nova tarefa com ID estável e único
    adicionarTarefa({
      id: crypto.randomUUID(),
      titulo: tituloTratado,
      categoria: form.categoria,
      voluntarios: voluntariosNum,
      concluida: form.concluida,
    });

    // Limpa o formulário após a adição
    setForm({
      titulo: "",
      categoria: "limpeza",
      voluntarios: 1,
      concluida: false,
    });
    setErro("");

    // Navega programaticamente se o callback for fornecido
    onSuccess?.();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="titulo">Título da Tarefa *</label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ex.: Pintar o muro da creche comunitária"
        />
      </div>

      <div className="form-group">
        <label htmlFor="categoria">Categoria *</label>
        <select
          id="categoria"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          {CATEGORIAS_VALIDAS.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.rotulo}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="voluntarios">Quantidade de Voluntários Necessários *</label>
        <input
          id="voluntarios"
          name="voluntarios"
          type="number"
          min="1"
          value={form.voluntarios}
          onChange={handleChange}
        />
      </div>

      <div className="form-group-checkbox">
        <label htmlFor="concluida">
          <input
            id="concluida"
            name="concluida"
            type="checkbox"
            checked={form.concluida}
            onChange={handleChange}
          />
          Esta tarefa já inicia concluída
        </label>
      </div>

      {erro && (
        <div className="form-error" role="alert">
          {erro}
        </div>
      )}

      <button type="submit" className="btn-primary">
        Cadastrar Tarefa no Mutirão
      </button>
    </form>
  );
}

