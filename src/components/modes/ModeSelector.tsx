import type { AppMode, Difficulty } from "../../types/solid";

interface Props {
  mode: AppMode;
  difficulty: Difficulty;
  onModeChange: (mode: AppMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const modes: { id: AppMode; title: string; description: string }[] = [
  { id: "calculator", title: "Calculadora", description: "Resultado rápido com etapas visíveis." },
  { id: "learning", title: "Aprendizagem", description: "Resolva cada etapa com dicas e feedback." },
  { id: "assessment", title: "Avaliação", description: "Sem dicas; correção somente ao finalizar." },
];

export function ModeSelector({ mode, difficulty, onModeChange, onDifficultyChange }: Props) {
  return (
    <section className="card p-5" aria-labelledby="mode-title">
      <h2 id="mode-title" className="text-lg font-semibold">Modo de uso</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {modes.map((item) => (
          <button key={item.id} type="button" onClick={() => onModeChange(item.id)} className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${mode === item.id ? "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-100" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"}`}>
            <span className="block font-bold">{item.title}</span>
            <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{item.description}</span>
          </button>
        ))}
      </div>
      {mode !== "calculator" && (
        <label className="mt-4 block text-sm font-medium">
          Nível de aprendizagem
          <select value={difficulty} onChange={(event) => onDifficultyChange(event.target.value as Difficulty)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950">
            <option value="easy">Fácil — mostra fórmula, substituição e dicas</option>
            <option value="medium">Médio — mostra fórmula e você completa etapas</option>
            <option value="hard">Difícil — apenas sólido e valores</option>
          </select>
        </label>
      )}
    </section>
  );
}
