/**
 * Dados semente do Mutirão do Bairro (Apostila e Especificação Oficial)
 * Categorias válidas: "limpeza" | "pintura" | "jardim" | "doacao"
 * Cada tarefa possui id estável para reconciliação consistente do React.
 */

export const tarefasIniciais = [
  {
    id: "praca-limpeza",
    titulo: "Limpeza da praça central",
    categoria: "limpeza",
    voluntarios: 4,
    concluida: false,
  },
  {
    id: "muro-pintura",
    titulo: "Pintura do muro da escola",
    categoria: "pintura",
    voluntarios: 2,
    concluida: true,
  },
  {
    id: "horta-comunitaria",
    titulo: "Preparo da horta comunitária",
    categoria: "jardim",
    voluntarios: 6,
    concluida: false,
  },
];

export const CATEGORIAS_VALIDAS = [
  { id: "limpeza", rotulo: "Limpeza" },
  { id: "pintura", rotulo: "Pintura" },
  { id: "jardim", rotulo: "Jardim e Horta" },
  { id: "doacao", rotulo: "Doações e Apoio" },
];

