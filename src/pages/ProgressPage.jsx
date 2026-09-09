import { useContext } from "react";
import { HabitsContext } from "../context/HabitsContext";

/**
 * Página de Progresso ProgressPage (Apostila - Seção 9.5: Rota com Guard)
 *
 * Exibe a porcentagem calculada do progresso diário de hábitos.
 * Esta rota é protegida pelo ProtectedProgressRoute, sendo acessível apenas se existirem hábitos cadastrados.
 */
export default function ProgressPage() {
  const { habits, completedCount } = useContext(HabitsContext);

  // Cálculo da porcentagem de conclusão arredondada
  const percentage = Math.round((completedCount / habits.length) * 100);

  return (
    <section>
      <p className="eyebrow">PROGRESSO</p>
      <h1>{percentage}% concluído hoje</h1>
      <p>
        {completedCount} de {habits.length} hábitos foram concluídos.
      </p>
    </section>
  );
}
