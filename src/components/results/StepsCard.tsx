import { MathExpression } from "./MathExpression";
interface Props { formula: string; substitution: string; steps: string[]; solidName: string; }
export function StepsCard({ formula, substitution, steps, solidName }: Props) {
  return (
    <section className="card p-5" aria-labelledby="math-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 id="math-title" className="text-lg font-semibold">Painel matemático</h2><p className="text-sm text-slate-500 dark:text-slate-400">{solidName}</p></div>
        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">KaTeX-ready</span>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <div><p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Fórmula</p><MathExpression value={formula} /></div>
        <div><p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Substituição</p><MathExpression value={substitution} /></div>
        <div><p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Resolução</p><div className="grid gap-2">{steps.map((step) => <MathExpression key={step} value={step} />)}</div></div>
      </div>
    </section>
  );
}
