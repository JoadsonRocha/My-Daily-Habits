import { Link } from "react-router";

/**
 * Página 404 NotFoundPage (Apostila - Seção 8.3: Criando páginas)
 *
 * Captura qualquer URL não mapeada nas rotas através do caminho curinga path="*".
 */
export default function NotFoundPage() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>O endereço informado não corresponde a uma rota da aplicação.</p>
      <Link to="/">Voltar ao início</Link>
    </section>
  );
}
