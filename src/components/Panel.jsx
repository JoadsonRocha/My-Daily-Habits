/**
 * Componente Panel (Apostila - Seção 3.4: Composição com children)
 * 
 * Demonstra o conceito de composição sobre herança no React:
 * - Em vez de criar componentes rígidos para cada tela, criamos containers reutilizáveis.
 * - A prop especial 'children' recebe qualquer conteúdo JSX colocado entre a abertura
 *   e o fechamento da tag: <Panel title="..."> [conteúdo inserido aqui vira children] </Panel>
 * - Permite encapsular estrutura visual (borda, cabeçalho, espaçamento) sem que o Panel
 *   precise conhecer os detalhes do que está sendo renderizado dentro dele.
 */
export default function Panel({ title, children }) {
  return (
    <section className="panel">
      {/* Cabeçalho do painel com o título recebido via prop */}
      <header className="panel-header">
        <h2>{title}</h2>
      </header>

      {/* Container onde o conteúdo dinâmico (children) é injetado */}
      <div className="panel-content">{children}</div>
    </section>
  );
}
