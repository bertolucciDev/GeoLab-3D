import type { InputField } from "../../types/solid";

interface Props {
  fields: InputField[];
  values: Record<string, number>;
  onValuesChange: (values: Record<string, number>) => void;
}

export function DynamicForm({ fields, values, onValuesChange }: Props) {
  return (
    <section className="card p-5" aria-labelledby="dimensions-title">
      <h2 id="dimensions-title" className="text-lg font-semibold">Dimensões</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">O modelo e os cálculos atualizam em tempo real.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <label key={field.id} className="grid gap-2 text-sm font-medium">
            <span>{field.label}</span>
            <div className="relative">
              <input
                type="number"
                required
                min={field.min ?? 0.1}
                step="any"
                value={values[field.id] ?? field.defaultValue}
                onChange={(event) => onValuesChange({ ...values, [field.id]: Number(event.target.value) })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">{field.unit}</span>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
