import { useContext } from "react";
import { TarefasContext } from "../context/TarefasContext";
import { CATEGORIAS_VALIDAS } from "../data/tarefas";

/**
 * Componente de Filtro de Categoria:
 * - Permite alternar o filtro entre "todas" e as categorias específicas.
 * - Mostra a contagem de tarefas visíveis correspondentes.
 */
export default function FiltroCategoria() {
  const context = useContext(TarefasContext);

  if (!context) {
    throw new Error("FiltroCategoria precisa estar dentro de TarefasProvider.");
  }

  const { categoriaFiltro, setCategoriaFiltro, tarefasFiltradas, tarefas } = context;

  return (
    <div className="category-filter" role="region" aria-label="Filtro por categoria">
      <label htmlFor="categoria-select">Filtrar por categoria:</label>
      <select
        id="categoria-select"
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
        className="filter-select"
      >
        <option value="todas">Todas as categorias ({tarefas.length})</option>
        {CATEGORIAS_VALIDAS.map((cat) => {
          const totalNaCategoria = tarefas.filter((t) => t.categoria === cat.id).length;
          return (
            <option key={cat.id} value={cat.id}>
              {cat.rotulo} ({totalNaCategoria})
            </option>
          );
        })}
      </select>

      <span className="filter-count">
        Exibindo {tarefasFiltradas.length} de {tarefas.length} tarefas
      </span>
    </div>
  );
}

