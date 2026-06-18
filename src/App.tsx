import { useEffect, useMemo, useState } from "react";
import { Header } from "./app/layout/Header";
import { Sidebar } from "./app/layout/Sidebar";
import { MainLayout } from "./app/layout/MainLayout";
import { solids } from "./data/solids";
import { SceneCanvas } from "./scene/SceneCanvas";
import { SolidRenderer } from "./scene/SolidRenderer";
import { DynamicForm } from "./components/forms/DynamicForm";
import { ResultCard } from "./components/results/ResultCard";
import { StepsCard } from "./components/results/StepsCard";
import type { SolidCategory } from "./types/solid";

type Theme = "light" | "dark";

function defaultsFor(solidId: string) {
  const solid = solids.find((item) => item.id === solidId) ?? solids[0];
  return Object.fromEntries(solid.inputs.map((field) => [field.id, field.defaultValue]));
}

function App() {
  const [solidId, setSolidId] = useState("sphere");
  const [category, setCategory] = useState<SolidCategory | "all">("all");
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem("geolab-theme") === "dark" ? "dark" : "light");
  const [formValues, setFormValues] = useState<Record<string, number>>(() => defaultsFor("sphere"));
  const solid = solids.find((item) => item.id === solidId) ?? solids[0];
  const result = useMemo(() => solid.calculate(formValues), [solid, formValues]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("geolab-theme", theme);
  }, [theme]);

  function selectSolid(nextSolidId: string) {
    setSolidId(nextSolidId);
    setFormValues(defaultsFor(nextSolidId));
  }

  return <><Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} /><MainLayout sidebar={<Sidebar selected={solidId} category={category} onCategoryChange={setCategory} onSelect={selectSolid} />}><section className="grid gap-6 xl:grid-cols-[1fr_360px]"><SceneCanvas><SolidRenderer solid={solid} values={formValues} /></SceneCanvas><div className="space-y-6"><div className="card p-5"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Sólido ativo</p><h2 className="mt-2 text-3xl font-black">{solid.name}</h2><p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Explore o volume com feedback visual imediato, controles profissionais e explicação matemática progressiva.</p></div><ResultCard volume={result.volume} /></div></section><DynamicForm fields={solid.inputs} values={formValues} onValuesChange={setFormValues} /><StepsCard solidName={solid.name} formula={result.formula} substitution={result.substitution} steps={result.steps} /></MainLayout></>;
}
export default App;
