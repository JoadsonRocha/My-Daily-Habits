import { useEffect, useState } from "react";
import { fetchHabitSuggestions } from "../services/habitSuggestions";

/**
 * Página de Sugestões SuggestionsPage (Apostila - Capítulos 10 e 11: Requisições HTTP e Fechamento)
 *
 * Conceitos aplicados:
 * 1. Máquina de estados: 'idle' | 'loading' | 'success' | 'error' evitando combinações ambíguas.
 * 2. Cancelamento com AbortController: Garante que requisições pendentes sejam canceladas
 *    quando o usuário muda de rota ou quando uma nova requisição é disparada.
 * 3. Tratamento explícito do AbortError: O cancelamento não é tratado como erro para o usuário.
 * 4. Tratamento de lista vazia (empty state) vs sucesso com itens.
 * 5. Mecanismo de re-tentativa (Retry) incrementando 'requestVersion'.
 */
export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    // Instancia o controlador para possibilitar o aborto da requisição
    const controller = new AbortController();

    async function loadSuggestions() {
      setStatus("loading");
      setErrorMessage("");

      try {
        const data = await fetchHabitSuggestions({
          signal: controller.signal,
        });

        setSuggestions(data);
        setStatus("success");
      } catch (error) {
        // Se a requisição foi abortada intencionalmente na desmontagem, ignoramos silenciosamente
        if (error.name === "AbortError") return;

        setSuggestions([]);
        setErrorMessage(
          error.message || "Não foi possível carregar as sugestões.",
        );
        setStatus("error");
      }
    }

    loadSuggestions();

    // Função de limpeza do efeito: cancela o fetch se a página for desmontada antes da resposta
    return () => {
      controller.abort();
    };
  }, [requestVersion]);

  // Dispara nova tentativa incrementando o versionador reativo
  function handleRetry() {
    setRequestVersion((version) => version + 1);
  }

  return (
    <section>
      <p className="eyebrow">API EXTERNA</p>
      <h1>Sugestões de prática</h1>

      {/* Estado: Carregando */}
      {status === "loading" && <p role="status">Carregando sugestões...</p>}

      {/* Estado: Erro com opção de nova tentativa */}
      {status === "error" && (
        <div role="alert" className="error-state">
          <p>{errorMessage}</p>
          <button type="button" onClick={handleRetry}>
            Tentar novamente
          </button>
        </div>
      )}

      {/* Estado: Sucesso sem dados (lista vazia) */}
      {status === "success" && suggestions.length === 0 && (
        <p>Nenhuma sugestão disponível neste momento.</p>
      )}

      {/* Estado: Sucesso com dados recebidos */}
      {status === "success" && suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>{suggestion.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
