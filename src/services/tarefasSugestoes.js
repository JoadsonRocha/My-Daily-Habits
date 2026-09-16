/**
 * Módulo de Serviço de Rede para Sugestões de Tarefas do Mutirão (Capítulos 10 e 11)
 *
 * Responsabilidades:
 * - Isolar o fetch e comunicação HTTP fora dos componentes visuais.
 * - Suportar cancelamento através de AbortSignal.
 * - Verificar status HTTP antes de processar os dados.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

export async function fetchSugestoesTarefas({ signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/todos?_limit=6`, { signal });

  // preferi checar explicitamente o response.ok antes de ler o corpo porque a promessa do fetch não é rejeitada em status 404 ou 500
  if (!response.ok) {
    throw new Error(`Erro na requisição: status ${response.status}`);
  }

  const dados = await response.json();

  // Mapeia e normaliza os dados da API externa para o domínio do Mutirão
  const categorias = ["limpeza", "pintura", "jardim", "doacao"];

  return dados.map((item, index) => ({
    id: `sugestao-${item.id}`,
    titulo: item.title,
    categoria: categorias[index % categorias.length],
    voluntarios: (index % 5) + 2,
    concluida: Boolean(item.completed),
  }));
}
