import { useEffect, useMemo, useState } from "react";
import { Header } from "./app/layout/Header";
import { Sidebar } from "./app/layout/Sidebar";
import { MainLayout } from "./app/layout/MainLayout";
import { DynamicForm } from "./components/forms/DynamicForm";
import { LearningPanel } from "./components/learning/LearningPanel";
import { ModeSelector } from "./components/modes/ModeSelector";
import { ResultCard } from "./components/results/ResultCard";
import { StepsCard } from "./components/results/StepsCard";
import { solids } from "./data/solids";
import { SceneCanvas } from "./scene/SceneCanvas";
import { SolidRenderer } from "./scene/SolidRenderer";
import type { AppMode, Difficulty, SolidCategory } from "./types/solid";
import { validateValues } from "./utils/validation";

type Theme = "light" | "dark";

function defaultsFor(solidId: string) {
  const solid = solids.find((item) => item.id === solidId) ?? solids[0];
  return Object.fromEntries(solid.inputs.map((field) => [field.id, field.defaultValue]));
}

function App() {
  const [solidId, setSolidId] = useState("sphere");
  const [category, setCategory] = useState<SolidCategory | "all">("all");
  const [mode, setMode] = useState<AppMode>("learning");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem("geolab-theme") === "dark" ? "dark" : "light");
  const [formValues, setFormValues] = useState<Record<string, number>>(() => defaultsFor("sphere"));
  const [sessionKey, setSessionKey] = useState("sphere-learning-easy");

  const solid = solids.find((item) => item.id === solidId) ?? solids[0];
  const validation = useMemo(() => validateValues(solid.inputs, formValues), [formValues, solid.inputs]);
  const result = useMemo(() => solid.calculate(validation.safeValues), [solid, validation.safeValues]);
  const canShowResult = validation.isValid && Number.isFinite(result.volume) && result.volume >= 0;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("geolab-theme", theme);
  }, [theme]);

  function resetSession(nextSolidId: string, nextMode = mode, nextDifficulty = difficulty) {
    setSessionKey(`${nextSolidId}-${nextMode}-${nextDifficulty}-${Date.now()}`);
  }

  function selectSolid(nextSolidId: string) {
    setSolidId(nextSolidId);
    setFormValues(defaultsFor(nextSolidId));
    resetSession(nextSolidId);
  }

  function changeMode(nextMode: AppMode) {
    setMode(nextMode);
    resetSession(solidId, nextMode);
  }

  function changeDifficulty(nextDifficulty: Difficulty) {
    setDifficulty(nextDifficulty);
    resetSession(solidId, mode, nextDifficulty);
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <MainLayout sidebar={<Sidebar selected={solidId} category={category} onCategoryChange={setCategory} onSelect={selectSolid} />}>
        <ModeSelector mode={mode} difficulty={difficulty} onModeChange={changeMode} onDifficultyChange={changeDifficulty} />
        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <SceneCanvas values={validation.safeValues} solid={solid}>
            <SolidRenderer solid={solid} values={validation.safeValues} />
          </SceneCanvas>
          <div className="space-y-6">
            <div className="card p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Sólido ativo</p>
              <h2 className="mt-2 text-3xl font-black">{solid.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Investigue fórmula, substituição e operações até conseguir chegar ao volume sozinho.</p>
            </div>
            {mode === "calculator" && canShowResult && <ResultCard volume={result.volume} />}
          </div>
        </section>
        <DynamicForm fields={solid.inputs} values={formValues} errors={validation.errors} onValuesChange={setFormValues} />
        <LearningPanel key={sessionKey} mode={mode} difficulty={difficulty} result={result} canShowResult={canShowResult} />
        {(mode === "calculator" || difficulty === "easy") && <StepsCard solidName={solid.name} formula={result.formula} substitution={result.substitution} steps={result.steps} />}
      </MainLayout>
    </>
  );
}

export default App;
