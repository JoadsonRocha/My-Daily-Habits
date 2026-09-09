/**
 * Módulo de Serviço: Sugestões de Hábitos via API Externa (Apostila - Capítulos 10 e 11)
 *
 * Responsabilidades:
 * - Isolar o acesso à rede, URLs e mapeamento de dados fora dos componentes visuais.
 * - Obter a URL base da API através de variável de ambiente (VITE_API_BASE_URL).
 * - Suportar cancelamento de requisição através do AbortSignal (Seção 11.2).
 * - Validar se a resposta HTTP foi bem-sucedida (response.ok) antes de analisar o JSON.
 * - Transformar o formato vindo da API externa (JSONPlaceholder) no modelo usado pela aplicação.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

/**
 * Busca sugestões de hábitos didáticas da API externa
 * @param {Object} options
 * @param {AbortSignal} [options.signal] - Sinal para abortar requisições em andamento
 * @returns {Promise<Array<{id: number|string, title: string, completed: boolean}>>}
 */
export async function fetchHabitSuggestions({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/todos?_limit=6`, { signal });

  // Verificação explícita do status HTTP (status 200-299)
  if (!response.ok) {
    throw new Error(`Falha HTTP: ${response.status}`);
  }

  const todos = await response.json();

  // Adaptação dos dados externos para o modelo do My Daily Habits
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
  }));
}
