import { useContext, useEffect, useState } from "react";
import { TarefasContext } from "../context/TarefasContext";
import { fetchSugestoesTarefas } from "../services/tarefasSugestoes";

/**
 * Página de Sugestões SugestoesPage (/sugestoes):
 * - Integração HTTP através do módulo de serviço em src/services/.
 * - Máquina de 4 estados sem sobreposição: 'idle' | 'loading' | 'success' | 'error'.
 * - AbortController com limpeza no desmontar (sem gerar erro visível ao usuário).
 * - Botão de retry que refaz a busca.
 */
export default function SugestoesPage() {
  const [sugestoes, setSugestoes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [mensagemErro, setMensagemErro] = useState("");
  const [versaoBusca, setVersaoBusca] = useState(0);

  const context = useContext(TarefasContext);
  const { adicionarTarefa } = context || {};

  useEffect(() => {
    const controller = new AbortController();

    async function carregarSugestoes() {
      setStatus("loading");
      setMensagemErro("");

      try {
        const dados = await fetchSugestoesTarefas({
          signal: controller.signal,
        });

        setSugestoes(dados);
        setStatus("success");
      } catch (error) {
        // Ignora silenciosamente erros causados pelo cancelamento voluntário ao sair da página
        if (error.name === "AbortError") {
          return;
        }

        setSugestoes([]);
        setMensagemErro(
          error.message || "Não foi possível carregar as sugestões do servidor."
        );
        setStatus("error");
      }
    }

    carregarSugestoes();

    return () => {
      controller.abort();
    };
  }, [versaoBusca]);

  function handleRetry() {
    setVersaoBusca((v) => v + 1);
  }

  function handleAdotar(sugestao) {
    if (!adicionarTarefa) return;

    adicionarTarefa({
      id: crypto.randomUUID(),
      titulo: sugestao.titulo,
      categoria: sugestao.categoria,
      voluntarios: sugestao.voluntarios,
      concluida: false,
    });

    // Remove a sugestão adotada da lista visual
    setSugestoes((current) => current.filter((s) => s.id !== sugestao.id));
  }

  return (
    <section className="sugestoes-page">
      <header className="page-header">
        <p className="eyebrow">BANCO DE IDEIAS (API EXTERNA)</p>
        <h1>Sugestões Comunitárias</h1>
        <p>Ações e iniciativas inspiradas em projetos de bairros vizinhos.</p>
      </header>

      {/* Estado 1: Carregamento */}
      {status === "loading" && (
        <div className="status-box loading-box" role="status">
          <span className="spinner">⏳</span>
          <p>Buscando sugestões na rede externa...</p>
        </div>
      )}

      {/* Estado 2: Erro com mecanismo de Retry */}
      {status === "error" && (
        <div className="status-box error-box" role="alert">
          <p className="error-title">Falha na comunicação:</p>
          <p>{mensagemErro}</p>
          <button type="button" className="btn-retry" onClick={handleRetry}>
            Tentar novamente
          </button>
        </div>
      )}

      {/* Estado 3: Sucesso com lista vazia */}
      {status === "success" && sugestoes.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma sugestão disponível no momento. Todas as ideias já foram adotadas!</p>
          <button type="button" className="btn-secondary" onClick={handleRetry}>
            Recarregar sugestões
          </button>
        </div>
      )}

      {/* Estado 4: Sucesso com itens */}
      {status === "success" && sugestoes.length > 0 && (
        <div className="sugestoes-grid">
          {sugestoes.map((sugestao) => (
            <article key={sugestao.id} className="sugestao-card">
              <div className="task-header">
                <span className={`category-badge category-${sugestao.categoria}`}>
                  {sugestao.categoria}
                </span>
                <span className="volunteers-tag">
                  👤 Estimativa: {sugestao.voluntarios} voluntários
                </span>
              </div>

              <h3>{sugestao.titulo}</h3>

              <button
                type="button"
                className="btn-adopt"
                onClick={() => handleAdotar(sugestao)}
              >
                + Adicionar ao nosso Mutirão
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
