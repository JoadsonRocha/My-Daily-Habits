/**
 * Dados Iniciais de Hábitos (Apostila - Seção 2.3: Os dados dos hábitos)
 *
 * Cada hábito possui:
 * - id: Identificador único e estável (string). Importante para a prop 'key' no React e para busca/atualização.
 * - title: Nome descritivo do hábito.
 * - goal: Meta diária estabelecida.
 * - completed: Booleano representando se o hábito já foi cumprido ou não.
 */
export const initialHabits = [
  {
    id: "water",
    title: "Beber água",
    goal: "8 copos",
    completed: true,
  },
  {
    id: "react-study",
    title: "Estudar React",
    goal: "30 minutos",
    completed: false,
  },
  {
    id: "walk",
    title: "Caminhar",
    goal: "20 minutos",
    completed: false,
  },
];
