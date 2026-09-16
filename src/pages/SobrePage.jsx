import Painel from "../components/Painel";

/**
 * Página Sobre SobrePage (/sobre):
 * Marcador de autoria obrigatório:
 * - Apresenta em duas frases a coisa mais difícil da atividade e como foi resolvida.
 */
export default function SobrePage() {
  return (
    <section className="sobre-page">
      <header className="page-header">
        <p className="eyebrow">INFORMAÇÕES</p>
        <h1>Sobre o Mutirão do Bairro</h1>
        <p>Projeto final do Módulo 04 — Desenvolvimento Front-end com React.</p>
      </header>

      <Painel title="Marcador de Autoria & Reflexão do Desenvolvedor">
        <div className="author-reflection">
          <blockquote>
            "A parte mais desafiadora desta atividade foi dominar o cancelamento seguro de requisições assíncronas com AbortController e garantir a limpeza dos efeitos no desmontar dos componentes sem gerar condições de corrida. Superei essa dificuldade analisando os ciclos de vida na documentação oficial do React e estruturando a máquina de quatro estados sem sobreposição para proteger a experiência do usuário."
          </blockquote>
          <p className="author-signature">— Joadson Rocha, Desenvolvedor</p>
        </div>
      </Painel>

      <Painel title="Sobre o Projeto e Tecnologias">
        <p>
          O <strong>Mutirão do Bairro</strong> é uma plataforma Single Page Application (SPA)
          criada para organizar, coordenar e dar visibilidade a iniciativas voluntárias de melhoria
          comunitária, tais como reformas de espaços públicos, plantio de mudas e arrecadação solidária.
        </p>
        <ul className="tech-list">
          <li><strong>React 19:</strong> Componentização funcional, JSX declarativo e renderização condicional.</li>
          <li><strong>React Router 8:</strong> Navegação cliente-side, rotas dinâmicas, aninhadas e controle de histórico.</li>
          <li><strong>Context API:</strong> Estado global centralizado, persistência no navegador e eliminação de prop drilling.</li>
          <li><strong>Vite:</strong> Ferramenta de build de alta performance e suporte a variáveis de ambiente.</li>
        </ul>
      </Painel>
    </section>
  );
}
