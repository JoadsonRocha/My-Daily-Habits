# Missões de documentação

Nome: Joadson Rocha  
Repositório: mutirao-do-bairro  

## Como preencher

Para cada missão, três coisas:
- **Resposta:** em suas palavras, 2 a 4 frases. Texto copiado da documentação vale zero.
- **Fonte:** a URL exata da página oficial onde você achou.
- **No meu código:** arquivo e o que você fez com essa informação.

---

## M1 — Como se controla um `<select>` em React?

**Resposta:**
Em React, um `<select>` é controlado passando o atributo `value` diretamente na tag `<select>`, e não utilizando a propriedade `selected` nas tags `<option>`. O componente React sincroniza o valor selecionado em uma variável de estado via manipulador `onChange`. Isso torna a seleção previsível e centralizada em um único ponto declarativo.

**Fonte:**
https://react.dev/reference/react-dom/components/select

**No meu código:**
`src/components/FormularioTarefa.jsx` (no campo de categoria) e `src/components/FiltroCategoria.jsx` (no seletor de filtro).

---

## M2 — Como se controla uma caixa de seleção, e por que o atributo é outro?

**Resposta:**
Uma caixa de seleção (`<input type="checkbox">`) é controlada utilizando o atributo booleano `checked`, em vez do atributo `value`. Isso acontece porque caixas de seleção representam um estado binário (ativado ou desativado), enquanto o `value` no HTML tradicional serve apenas para enviar dados textuais estáticos. No evento `onChange`, o novo valor deve ser capturado através de `event.target.checked`.

**Fonte:**
https://react.dev/reference/react-dom/components/input#controlling-a-checkbox

**No meu código:**
`src/components/FormularioTarefa.jsx` (no campo "concluida" para indicar se a tarefa já inicia concluída).

---

## M3 — `value` sem `onChange`: qual aviso o React emite e por quê?

**Resposta:**
Quando passamos a prop `value` para um campo de formulário sem fornecer um manipulador `onChange` (e sem marcá-lo como `readOnly`), o React emite um aviso no console informando que você criou um campo controlado sem manipulador de alteração. O React faz isso porque o campo se tornará somente leitura na tela: qualquer digitação do usuário será cancelada na próxima renderização, já que o React continuará forçando o valor fixado no estado.

**Fonte:**
https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable

**No meu código:**
`src/components/FormularioTarefa.jsx` (todos os campos com `value` são acompanhados por `onChange={handleChange}`).

---

## M4 — O que `useParams` devolve num segmento que parece número?

**Resposta:**
O hook `useParams` sempre retorna os valores dos parâmetros dinâmicos como texto (`string`), independentemente de o segmento da URL ser composto apenas por dígitos numéricos (por exemplo, em `/tarefas/123`). Se os dados internos da sua aplicação utilizarem números como identificadores, é necessário fazer a conversão explícita com `Number(id)` antes de realizar comparações estritas (`===`).

**Fonte:**
https://reactrouter.com/start/framework/routing#dynamic-segments

**No meu código:**
`src/pages/DetalhesTarefaPage.jsx` (onde lemos `const { tarefaId } = useParams()` e comparamos com os IDs das tarefas).

---

## M5 — Além da classe `active`, como o `NavLink` informa que está ativo?

**Resposta:**
Além de adicionar a classe CSS `.active`, o `NavLink` do React Router insere automaticamente o atributo de acessibilidade `aria-current="page"` na tag `<a>` quando o link corresponde à rota ativa. Além disso, o `NavLink` permite que as props `className` e `style` recebam uma função que recebe um objeto `{ isActive, isPending }`, possibilitando aplicar estilos condicionais personalizados via código.

**Fonte:**
https://reactrouter.com/api/navlink

**No meu código:**
`src/layouts/AppLayout.jsx` (na barra de navegação com a prop `end` na rota raiz `/`).

---

## M6 — O que a prop `replace` muda no `Navigate`?

**Resposta:**
A prop `replace` faz com que o componente `<Navigate>` substitua a entrada atual na pilha de histórico do navegador em vez de empilhar um novo registro. Em rotas protegidas ou com redirecionamento condicional, isso evita que o usuário fique preso em um ciclo infinito caso clique no botão "Voltar" do navegador.

**Fonte:**
https://reactrouter.com/api/navigate

**No meu código:**
`src/pages/RelatorioPage.jsx` (redirecionando para `/nova` com `<Navigate to="/nova" replace />` quando a lista de tarefas está vazia).

---

## M7 — Por que um 404 não rejeita a promessa do `fetch`?

**Resposta:**
A promessa retornada pela Fetch API só é rejeitada quando ocorre uma falha real de comunicação na rede, como falta de conexão à internet, falha de resolução de DNS ou cancelamento da requisição. Respostas com códigos HTTP de erro (como 404 Not Found ou 500 Internal Server Error) ainda são consideradas respostas bem-sucedidas em nível de transporte HTTP. Por isso, é obrigatório verificar a propriedade `response.ok` antes de ler os dados com `response.json()`.

**Fonte:**
https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch

**No meu código:**
`src/services/tarefasSugestoes.js` (verificação explícita `if (!response.ok) throw new Error(...)`).

---

## M8 — Qual o nome e o tipo do erro de uma requisição abortada?

**Resposta:**
Quando uma requisição disparada pelo `fetch` é cancelada através de um `AbortSignal`, a promessa é rejeitada com uma exceção do tipo `DOMException` cujo atributo `name` possui exatamente o valor `"AbortError"`. No bloco `catch`, tratamos essa exceção verificando `error.name === "AbortError"` para encerrar silenciosamente a requisição sem exibir mensagem de falha ao usuário.

**Fonte:**
https://developer.mozilla.org/en-US/docs/Web/API/AbortController

**No meu código:**
`src/pages/SugestoesPage.jsx` (no bloco `catch` do efeito de busca de sugestões).

---

## M9 — Que exceção o armazenamento do navegador pode lançar ao gravar?

**Resposta:**
O método `localStorage.setItem` pode disparar a exceção `QuotaExceededError` (do tipo `DOMException`) caso a cota máxima de armazenamento do navegador (normalmente em torno de 5MB) seja atingida para o domínio, ou se a navegação estiver em modo anônimo com bloqueio de armazenamento. Por esse motivo, é mandatório proteger as operações de gravação com blocos `try/catch`.

**Fonte:**
https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage

**No meu código:**
`src/context/TarefasContext.jsx` (no `useEffect` que persiste as tarefas no LocalStorage).

---

## M10 — Por que `import.meta.env` e não `process.env` no Vite?

**Resposta:**
O Vite opera nativamente com ECMAScript Modules (ESM) no navegador, ambiente no qual a variável global `process` do Node.js não existe por padrão. O ecossistema moderno de módulos ES padronizou `import.meta` para acessar metadados do contexto. Além disso, o Vite exige o prefixo `VITE_` em variáveis personalizadas para impedir que variáveis secretas ou sensíveis do servidor vazem para o código cliente.

**Fonte:**
https://vite.dev/guide/env-and-mode.html

**No meu código:**
`src/services/tarefasSugestoes.js` (ao consultar `import.meta.env.VITE_API_BASE_URL`).

---

## M11 — Um bug concreto causado por usar o índice como `key`

**Resposta:**
Usar o índice do array como `key` produz bugs visuais graves quando itens da lista são removidos ou reordenados e possuem estado local ou elementos não controlados (como inputs ou classes dinâmicas). Como o React usa a chave para reconciliar a identidade do nó, ao remover o primeiro item da lista, o segundo item assume o índice 0 e o React reutiliza indevidamente a instância DOM e o estado do elemento deletado.

**Como reproduzir no meu projeto:**
Substituir temporariamente `key={tarefa.id}` por `key={index}` em `ListaTarefas.jsx`, cadastrar duas tarefas, alterar o status da primeira e excluí-la. A tarefa restante herdará de forma incorreta o estado de conclusão da anterior.

**Fonte:**
https://react.dev/learn/rendering-lists#why-does-react-need-keys

---

## M12 — Por que um efeito parece rodar duas vezes em desenvolvimento?

**Resposta:**
Em ambiente de desenvolvimento, quando o componente está dentro do `<StrictMode>`, o React monta, desmonta e remonta propositalmente cada efeito colateral uma segunda vez. Isso não é um defeito nem um bug do navegador: o objetivo do React é forçar o desenvolvedor a escrever funções de limpeza (cleanup) adequadas para evitar vazamento de memória, timers perdidos ou conexões abertas.

**Fonte:**
https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development

**No meu código:**
`src/main.jsx` (onde o `<StrictMode>` está configurado) e `src/context/TarefasContext.jsx` (na limpeza do título da aba do navegador).

