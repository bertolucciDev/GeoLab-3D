import { MathExpression } from "./MathExpression";

interface Props {
  formula: string;
  substitution: string;
  steps: string[];
  solidName: string;
}

export function StepsCard({ formula, substitution, steps, solidName }: Props) {
  const [baseStep, operationStep, resultStep] = steps;

  return (
    <section className="card p-5" aria-labelledby="math-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="math-title" className="text-lg font-semibold">Painel matemático</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{solidName}</p>
        </div>
        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">resultado auditável</span>
      </div>

      <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
        <p className="text-sm font-bold text-blue-800 dark:text-blue-100">Como o cálculo é feito?</p>
        <p className="mt-2 text-sm leading-6 text-blue-700 dark:text-blue-200">
          Cubos e paralelepípedos multiplicam comprimento × largura × altura. Prismas e cilindros multiplicam a área da base pela altura. Pirâmides e cones usam área da base × altura e dividem por 3.
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <MathBlock label="1. Fórmula" value={formula} />
        <MathBlock label="2. Substituição" value={substitution} />
        <MathBlock label="3. Área da base" value={baseStep} />
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">4. Resolução</p>
          <div className="grid gap-2">
            {operationStep && <MathExpression value={operationStep} />}
            {resultStep && <MathExpression value={resultStep} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function MathBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/70">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <MathExpression value={value} />
    </div>
  );
}
