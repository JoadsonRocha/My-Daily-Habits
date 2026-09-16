/**
 * Componente Painel reutilizável que encapsula conteúdo visual através da prop especial 'children'.
 * Utilizado na Home e nas páginas de relatório/listagem.
 */
export default function Painel({ title, children }) {
  return (
    <section className="panel">
      {title && <h2 className="panel-title">{title}</h2>}
      <div className="panel-content">{children}</div>
    </section>
  );
}

