import { Link } from "react-router";

/**
 * Página 404 NotFoundPage (Apostila - Seção 8.3: Criando páginas)
 *
 * Captura qualquer URL não mapeada nas rotas através do caminho curinga path="*".
 * Página 404 NotFoundPage (Rota Curinga '*'):
 * - Renderizada quando nenhuma rota configurada corresponde à URL digitada.
 */
export default function NotFoundPage() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>O endereço informado não corresponde a uma rota da aplicação.</p>
      <Link to="/">Voltar ao início</Link>
    <section className="not-found-page" role="alert">
      <p className="eyebrow">ERRO 404</p>
      <h1>Página Não Encontrada</h1>
      <p>O endereço solicitado não faz parte do mapa de ações do Mutirão do Bairro.</p>
      <Link to="/" className="btn-primary">
        Voltar para a página inicial
      </Link>
    </section>
  );
}
