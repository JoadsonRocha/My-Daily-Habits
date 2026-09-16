import { useNavigate } from "react-router";
import FormularioTarefa from "../components/FormularioTarefa";
import Painel from "../components/Painel";

/**
 * Página de Cadastro de Nova Tarefa (/nova):
 * - Renderiza o formulário controlado.
 * - Navega programmaticamente para o painel raiz ("/") após o cadastro com sucesso.
 */
export default function NovaTarefaPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <header className="page-header">
        <p className="eyebrow">CADASTRO</p>
        <h1>Nova Tarefa do Mutirão</h1>
        <p>Preencha os dados abaixo para engajar a comunidade na ação coletiva.</p>
      </header>

      <Painel title="Formulário de Inscrição da Atividade">
        <FormularioTarefa onSuccess={() => navigate("/")} />
      </Painel>
    </div>
  );
}

