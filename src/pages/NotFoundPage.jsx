import { Link } from "react-router";

/**
 * Página 404 NotFoundPage (Rota Curinga '*'):
 * - Renderizada quando nenhuma rota configurada corresponde à URL digitada.
 */
export default function NotFoundPage() {
  return (
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
