import type { AppMode, Difficulty } from "../../types/solid";

interface Props {
  mode: AppMode;
  difficulty: Difficulty;
  solidName: string;
}

const modeLabels: Record<AppMode, string> = {
  calculator: "calcular rapidamente",
  learning: "aprender passo a passo",
  assessment: "praticar em avaliação",
};

const difficultyLabels: Record<Difficulty, string> = {
  easy: "com fórmulas, substituições e dicas visíveis",
  medium: "com apoio inicial e mais autonomia",
  hard: "com desafio máximo e sem pistas",
};

const stages = [
  {
    title: "1. Observe",
    description: "Gire o sólido 3D e reconheça quais medidas participam do volume.",
  },
  {
    title: "2. Configure",
    description: "Ajuste as dimensões e confira se os valores são coerentes.",
  },
  {
    title: "3. Resolva",
    description: "Acompanhe a fórmula, a substituição e as operações na ordem correta.",
  },
  {
    title: "4. Verifique",
    description: "Compare o resultado, revise erros e use a calculadora quando precisar.",
  },
];

export function PedagogicalGuide({ mode, difficulty, solidName }: Props) {
  return (
    <section className="card overflow-hidden" aria-labelledby="guide-title">
      <div className="grid gap-5 p-5 lg:grid-cols-[1.2fr_2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Roteiro pedagógico</p>
          <h2 id="guide-title" className="mt-2 text-2xl font-black">Como estudar {solidName}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Você está no modo de {modeLabels[mode]} {mode === "calculator" ? "com etapas auditáveis" : difficultyLabels[difficulty]}. Use o roteiro para relacionar visualização, medidas e cálculo.
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => (
            <li key={stage.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
              <h3 className="font-bold text-blue-700 dark:text-blue-200">{stage.title}</h3>
              <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
