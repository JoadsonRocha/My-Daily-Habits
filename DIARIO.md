# Diário de desenvolvimento

Nome: Joadson Rocha  
Projeto: Mutirão do Bairro  

---

## Modelo de Registros

### Entrada 1 — 16/09/2026 14:15

**Etapa:** E2

**O que eu estava fazendo:**
Renderizando a lista de cartões com `map()` em `ListaTarefas.jsx`.

**Mensagem exata (copiada do console):**
```
Warning: Each child in a list should have a unique "key" prop.
Check the render method of `ListaTarefas`. See https://react.dev/link/warning-keys for more information.
```

**O que eu esperava que acontecesse:**
Os cartões deveriam ser renderizados sem nenhum aviso no console do navegador.

**O que eu tentei, em ordem:**
1. Olhei a tag `<CartaoTarefa>` dentro do `.map()`.
2. Percebi que esqueci de passar a propriedade `key`.

**Como resolvi:**
Adicionei a prop estável `key={tarefa.id}` vinda diretamente do dado do objeto, sem utilizar o índice do array.

**Onde procurei:**
Documentação oficial do React (`react.dev` — Renderizando listas).

---

### Entrada 2 — 16/09/2026 14:50

**Etapa:** E3

**O que eu estava fazendo:**
Configurando o evento de clique no botão de alternar tarefa no `CartaoTarefa.jsx`.

**Mensagem exata (copiada do console):**
```
Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
    at renderWithHooks (react-dom_client.js:7120)
```

**O que eu esperava que acontecesse:**
A função `onToggle` só deveria ser disparada quando o usuário clicasse no botão.

**O que eu tentei, em ordem:**
1. Verifiquei o handler do botão e encontrei `onClick={onToggle(id)}`.
2. Entendi que a função estava sendo invocada imediatamente durante a renderização do JSX, provocando um loop de re-renderizações.

**Como resolvi:**
Passei uma função anônima de callback: `onClick={() => onToggle(id)}`.

**Onde procurei:**
Apostila Capítulo 3 e documentação do React sobre manipuladores de eventos.

---

### Entrada 3 — 16/09/2026 15:35

**Etapa:** E5

**O que eu estava fazendo:**
Submetendo o formulário de cadastro de nova tarefa.

**Mensagem exata (copiada do terminal/navegador):**
A página inteira recarregava, limpava o formulário sem salvar no estado e a URL ficava com query params vazios `http://localhost:5173/?titulo=Pintar+muro`.

**O que eu esperava que acontecesse:**
A tarefa deveria ser adicionada ao estado global e a página deveria manter a navegação em Single Page Application (SPA) sem reload.

**O que eu tentei, em ordem:**
1. Verifiquei a função `handleSubmit`.
2. Notei que faltava a chamada preventiva do evento nativo do formulário.

**Como resolvi:**
Inseri `event.preventDefault()` na primeira linha da função `handleSubmit` no `FormularioTarefa.jsx`.

**Onde procurei:**
Apostila Capítulo 5 (Formulários e Handlers).

---

### Entrada 4 — 16/09/2026 16:10

**Etapa:** E6

**O que eu estava fazendo:**
Simulando teste defensivo com dados corrompidos salvos no `localStorage`.

**Mensagem exata (copiada do console):**
```
Uncaught SyntaxError: Unexpected token 'i', "invalido" is not valid JSON
    at JSON.parse (<anonymous>)
    at loadTarefas (TarefasContext.jsx:15)
```

**O que eu esperava que acontecesse:**
Se o usuário ou uma extensão salvasse um dado corrompido no `localStorage`, o sistema deveria retornar os dados iniciais sem travar em tela branca.

**O que eu tentei, em ordem:**
1. Adicionei bloco `try/catch` ao redor de `JSON.parse(salvo)`.
2. Validei se o retorno após o parse era de fato um array com `Array.isArray()`.

**Como resolvi:**
No bloco `catch`, retornei a constante `tarefasIniciais`, assegurando que o estado sempre receba um array válido.

**Onde procurei:**
MDN Web Docs (`JSON.parse` e `Window.localStorage`).

---

### Entrada 5 — 16/09/2026 16:45

**Etapa:** E7

**O que eu estava fazendo:**
Acessando a rota de detalhes de uma tarefa diretamente pela URL `/tarefas/id-que-nao-existe`.

**Mensagem exata (copiada do console):**
```
Uncaught TypeError: Cannot read properties of undefined (reading 'titulo')
    at DetalhesTarefaPage (DetalhesTarefaPage.jsx:34)
```

**O que eu esperava que acontecesse:**
O componente deveria exibir uma mensagem amigável de tarefa não encontrada e um botão para retornar à listagem.

**O que eu tentei, em ordem:**
1. Verifiquei que `tarefas.find()` retornava `undefined` quando o ID não era localizado.
2. O JSX tentava acessar `tarefa.titulo` sem verificar a existência do objeto.

**Como resolvi:**
Adicionei a verificação condicional defensiva antes do retorno principal:
```javascript
if (!tarefa) {
  return (
    <section className="not-found-card">
      <h2>Tarefa não encontrada</h2>
      <Link to="/tarefas">Voltar à lista</Link>
    </section>
  );
}
```

**Onde procurei:**
Apostila Capítulo 9 (Rotas dinâmicas e tratamento de 404 de conteúdo).
