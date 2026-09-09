# My Daily Habits

Projeto desenvolvido no **Módulo 04 - Desenvolvimento Front-end com React** da **Capacitação em Desenvolvimento Full Stack**.

Professor: Esp. Virgílio do Rego Monteiro Borges Junior

---

## 📋 Requisitos
- Node.js (versão LTS atual compatível com o Vite)
- npm

---

## 🚀 Como executar o projeto localmente

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/SEU-USUARIO/my-daily-habits.git
   cd my-daily-habits
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Crie o arquivo de variáveis de ambiente a partir do modelo:
   ```bash
   cp .env.example .env
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra a URL informada pelo terminal (geralmente `http://localhost:5173/`).

---

## 🛠️ Build e Produção

Para gerar e validar os arquivos otimizados de produção:
```bash
npm run build
npm run preview
```

---

## ✨ Funcionalidades Desenvolvidas

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
