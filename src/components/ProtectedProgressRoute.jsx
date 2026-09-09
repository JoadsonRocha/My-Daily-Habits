import { useContext } from "react";
import { Navigate } from "react-router";
import { HabitsContext } from "../context/HabitsContext";

/**
 * Rota Protegida Didática (Apostila - Seção 9.5: Uma rota protegida para fins didáticos)
 *
 * Responsabilidades:
 * - Atua como um "Route Guard" no cliente: verifica uma condição antes de permitir o acesso.
 * - Se não houver hábitos cadastrados (habits.length === 0), redireciona automaticamente
 *   o usuário para "/novo" via componente <Navigate replace />.
 * - Se houver hábitos, renderiza normalmente os componentes filhos ({children}).
 * 
 * Importante sobre segurança (Apostila Seção 9.5):
 * Redirecionamentos no front-end são regras de UX/experiência. Proteção de dados e autorização
 * real de segurança devem sempre ser validadas no servidor/backend.
 */
export default function ProtectedProgressRoute({ children }) {
  const { habits } = useContext(HabitsContext);

  if (habits.length === 0) {
    return <Navigate to="/novo" replace />;
  }

  return children;
}
