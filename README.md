# My Daily Habits
# Mutirão do Bairro — Painel do Joadson

Projeto desenvolvido no **Módulo 04 - Desenvolvimento Front-end com React** da **Capacitação em Desenvolvimento Full Stack**.
Aplicação Single Page Application (SPA) para gestão de tarefas comunitárias em mutirões de bairro, desenvolvida como **Atividade Final do Módulo 04 (Front-end com React)** da Capacitação em Desenvolvimento Full Stack (ITEAM 2026, Boa Vista/RR).

Professor: Esp. Virgílio do Rego Monteiro Borges Junior
Desenvolvido por: **Joadson Rocha**  
Professor: **Esp. Virgílio do Rego Monteiro Borges Junior**

---

## 📋 Requisitos
- Node.js (versão LTS atual compatível com o Vite)
- npm
## 🚀 Funcionalidades

- **Quadro de Tarefas Comunitárias:** Visualização das ações com distinção visual entre concluídas e pendentes.
- **Exclusão de Tarefas:** Remoção imutável de tarefas através de `.filter()`.
- **Filtro Dinâmico por Categoria:** Filtragem em tempo real por `limpeza`, `pintura`, `jardim` ou `doacao`, com contadores visíveis ajustados.
- **Cadastro com Formulário Controlado:**
  - `<select>` controlado para seleção de categoria.
  - `<input type="checkbox">` controlado com `checked` para definir situação inicial.
  - Validação de campos na interface sem uso de `alert()`.
- **Persistência Defensiva no Navegador:**
  - Sincronização automática no `localStorage`.
  - Tratamento com `try/catch` para corrupção de dados: se o valor salvo estiver corrompido, a aplicação reverte com segurança para os dados semente sem gerar tela branca.
- **Efeito de Título Dinâmico com Limpeza:** Atualiza `document.title` com o progresso do mutirão e restaura o título anterior na desmontagem.
- **Roteamento Declarativo Completo (7 rotas):**
  - `/`: Painel do dia com resumo, contadores derivados e tarefas.
  - `/nova`: Formulário de cadastro de tarefas com redirecionamento pós-sucesso.
  - `/tarefas`: Lista completa de tarefas com layout próprio e `Outlet`.
  - `/tarefas/:tarefaId`: Página de detalhes com botão de histórico (`navigate(-1)`) e link fixo.
  - `/relatorio`: Relatório com métricas analíticas e condição de acesso didática (redireciona se a lista estiver vazia e nunca exibe `NaN`).
  - `/sugestoes`: Banco de ideias via API externa com máquina de 4 estados e cancelamento com `AbortController`.
  - `/sobre`: Informações do projeto e reflexão autoral do desenvolvedor.
  - `*`: Tratamento amigável para rotas inexistentes (404).

---

## 🚀 Como executar o projeto localmente
## 🛠️ Tecnologias e Escopo

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/SEU-USUARIO/my-daily-habits.git
   cd my-daily-habits
   ```
- **React 19**
- **React Router 8**
- **Vite 8**
- **Context API** para estado global sem prop drilling
- **Fetch API** com `AbortController`
- *Estritamente dentro do escopo pedagógico* (sem dependências de estado externas, sem bibliotecas de componentes e sem TypeScript).

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
---

3. Crie o arquivo de variáveis de ambiente a partir do modelo:
   ```bash
   cp .env.example .env
   ```
## ⚙️ Instalação e Execução

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
### Pré-requisitos
- Node.js (v22+)
- npm

5. Abra a URL informada pelo terminal (geralmente `http://localhost:5173/`).
### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/JoadsonRocha/My-Daily-Habits.git
cd My-Daily-Habits
git checkout mutirao-do-bairro
npm install
```

---
### 2. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo e crie o `.env`:
```bash
cp .env.example .env
```

## 🛠️ Build e Produção
Conteúdo de `.env`:
```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Para gerar e validar os arquivos otimizados de produção:
### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173` no navegador.

### 4. Gerar Build de Produção e Visualizar Preview
```bash
npm run build
npm run preview
```

---

## ✨ Funcionalidades Desenvolvidas
## 📂 Estrutura de Pastas

- **Componentes e JSX**: Estrutura modular e reutilizável com `HabitCard`, `HabitList` e `Panel`.
- **Composição sobre Herança**: Utilização de `children` para criação de containers visuais flexíveis.
- **Gerenciamento de Estado**: Estado centralizado com `useState` e atualizações imutáveis com `.map()` e *spread operator*.
- **Formulários Controlados**: Cadastro com validação defensiva e identificador único via `crypto.randomUUID()`.
- **Ciclo de Vida e Efeitos**: Persistência no `localStorage`, atualização dinâmica do título da aba com função de limpeza (*cleanup*).
- **Estado Global com Contexto**: Distribuição de dados e handlers via `createContext`, `HabitsProvider` e `useContext`, eliminando *prop drilling*.
- **Roteamento SPA**:
  - `BrowserRouter`, `Routes` e `Route` (React Router).
  - Navegação declarativa com `NavLink` (estilo ativo) e `Link`.
  - Rotas aninhadas e layouts compartilhados com `<Outlet />`.
  - Parâmetros dinâmicos de rota (`/habitos/:habitId`) com `useParams` e navegação programática com `useNavigate`.
  - Rota protegida com *guard* didático (`ProtectedProgressRoute`).
  - Rota curinga `*` com página 404 (`NotFoundPage`).
- **Comunicação Assíncrona e HTTP**:
  - Consumo de API externa via `fetch` nativo no serviço `habitSuggestions.js`.
  - Modelagem com máquina de estados (`idle`, `loading`, `success`, `error`).
  - Cancelamento de requisições com `AbortController` e tratamento de `AbortError`.
  - Botão de re-tentativa (*retry*) e tratamento diferenciado para listas vazias.
```
src/
├── components/
│   ├── CartaoTarefa.jsx       # Cartão da tarefa com ações e Link
│   ├── FiltroCategoria.jsx    # Controle de filtro por categoria com contagem
│   ├── FormularioTarefa.jsx   # Formulário controlado com select e checkbox
│   ├── ListaTarefas.jsx       # Listagem com map() e key estável
│   └── Painel.jsx             # Contêiner reutilizável usando children
├── context/
│   └── TarefasContext.jsx     # Context API, persistência, exclusão e título com cleanup
├── data/
│   └── tarefas.js             # Dados semente e categorias do mutirão
├── layouts/
│   ├── AppLayout.jsx          # Shell global e barra de navegação com NavLink
│   └── TarefasLayout.jsx      # Layout secundário com Outlet
├── pages/
│   ├── DetalhesTarefaPage.jsx # Segmento dinâmico useParams e botões de navegação
│   ├── HomePage.jsx           # Painel geral com métricas
│   ├── NotFoundPage.jsx       # Tratamento 404
│   ├── NovaTarefaPage.jsx     # Página com formulário de cadastro
│   ├── RelatorioPage.jsx      # Guard didático com Navigate e cálculos seguros
│   ├── SobrePage.jsx          # Marcador de autoria e desafios
│   ├── SugestoesPage.jsx      # 4 estados e AbortController
│   └── TarefasPage.jsx        # Lista completa no layout aninhado
├── services/
│   └── tarefasSugestoes.js    # Módulo de serviço HTTP isolado
├── App.css                    # Estilização completa da aplicação
├── App.jsx                    # Árvore declarativa de rotas
├── index.css                  # Estilos globais
└── main.jsx                   # Ponto de entrada com StrictMode e Providers
```

---

## 📝 Documentação da Avaliação

- `RESPOSTAS.md`: Respostas completas para as 12 missões da documentação oficial com URLs e referências no código.
- `DIARIO.md`: Registro de 5 ocorrências reais de depuração encontradas e resolvidas durante o desenvolvimento.
