import { useNavigate } from "react-router";
import HabitForm from "../components/HabitForm";
import Panel from "../components/Panel";

/**
 * Página de Cadastro NewHabitPage (Apostila - Seção 8.3 e 9.4: Navegação Programática)
 *
 * Utiliza o hook 'useNavigate' para redirecionar automaticamente o usuário de volta
 * à rota raiz ("/") após o cadastro bem-sucedido de um novo hábito.
 */
export default function NewHabitPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Novo hábito</h1>
      <Panel title="Cadastre uma pequena meta">
        {/* Passa a função de navegação no callback onSuccess */}
        <HabitForm onSuccess={() => navigate("/")} />
      </Panel>
    </>
  );
}
