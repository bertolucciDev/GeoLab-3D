import { useEffect, useMemo, useState } from "react";
import type { AppMode, AttemptLog, CalculationResult, Difficulty } from "../../types/solid";
import { isAcceptableAnswer } from "../../utils/validation";
import { MathExpression } from "../results/MathExpression";

interface Props {
  mode: AppMode;
  difficulty: Difficulty;
  result: CalculationResult;
  canShowResult: boolean;
}

interface StepState {
  attempts: number;
  errors: number;
  completed: boolean;
  feedback: string;
  showHint: boolean;
}

const initialStepState: StepState = { attempts: 0, errors: 0, completed: false, feedback: "", showHint: false };

export function LearningPanel({ mode, difficulty, result, canShowResult }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(1);
  const [states, setStates] = useState<Record<string, StepState>>({});
  const [logs, setLogs] = useState<AttemptLog[]>([]);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.max(1, Math.round((Date.now() - startedAt) / 1000)));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentStep = result.learningSteps[activeIndex];
  const completedSteps = result.learningSteps.filter((step) => states[step.id]?.completed).length;
  const totalAttempts = Object.values(states).reduce((sum, state) => sum + state.attempts, 0);
  const totalErrors = Object.values(states).reduce((sum, state) => sum + state.errors, 0);
  const accuracy = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - totalErrors) / totalAttempts) * 100));
  const completed = completedSteps === result.learningSteps.length;

  const finalFeedback = useMemo(() => {
    if (!completed) return "Em andamento";
    if (totalErrors === 0 && elapsedSeconds <= 90) return "Excelente";
    if (accuracy >= 70) return "Bom";
    return "Precisa Revisar";
  }, [accuracy, completed, elapsedSeconds, totalErrors]);

  if (mode === "calculator") {
    return null;
  }

  function submitAnswer() {
    if (!currentStep) return;
    const correct = isAcceptableAnswer(currentStep.expected, answer, currentStep.tolerance);
    const previous = states[currentStep.id] ?? initialStepState;
    const nextState: StepState = {
      ...previous,
      attempts: previous.attempts + 1,
      errors: previous.errors + (correct ? 0 : 1),
      completed: correct || previous.completed,
      feedback: correct ? currentStep.feedbackCorrect : currentStep.feedbackIncorrect,
    };
    setStates({ ...states, [currentStep.id]: nextState });
    setLogs([...logs, { stepId: currentStep.id, attempts: nextState.attempts, errors: nextState.errors, elapsedSeconds }]);
    if (correct) setAnswer("");
  }

  function nextStep() {
    setActiveIndex((index) => Math.min(index + 1, result.learningSteps.length - 1));
  }

  const currentState = currentStep ? states[currentStep.id] ?? initialStepState : initialStepState;
  const showInstruction = difficulty === "easy" || (difficulty === "medium" && activeIndex === 0);
  const allowHints = mode === "learning" && difficulty !== "hard";

  return (
    <section className="card p-5" aria-labelledby="learning-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Laboratório ativo</p>
          <h2 id="learning-title" className="text-xl font-bold">{mode === "assessment" ? "Modo Avaliação" : "Modo Aprendizagem"}</h2>
        </div>
        <div className="text-right text-sm text-slate-500 dark:text-slate-400">
          <p>{completedSteps}/{result.learningSteps.length} etapas</p>
          <p>{elapsedSeconds}s</p>
        </div>
      </div>

      {showInstruction && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><p className="text-xs uppercase text-slate-500">Fórmula</p><MathExpression value={result.formula} /></div>
          <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><p className="text-xs uppercase text-slate-500">Substituição</p><MathExpression value={result.substitution} /></div>
        </div>
      )}

      {currentStep && !completed && (
        <div className="mt-5 rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-sm font-bold text-blue-600 dark:text-blue-300">Passo {activeIndex + 1}: {currentStep.title}</p>
          <p className="mt-2 text-lg font-semibold">{currentStep.prompt}</p>
          {currentStep.answerType === "choice" ? (
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {currentStep.options?.map((option) => (
                <button key={option.id} type="button" onClick={() => setAnswer(option.id)} className={`rounded-2xl border px-4 py-3 text-left font-medium ${answer === option.id ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-200 dark:border-slate-700"}`}>{option.label}</button>
              ))}
            </div>
          ) : (
            <input value={answer} onChange={(event) => setAnswer(event.target.value)} inputMode="decimal" className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950" placeholder="Digite sua resposta" />
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={submitAnswer} className="rounded-2xl bg-blue-600 px-4 py-2 font-bold text-white shadow-lg shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20">Validar</button>
            {allowHints && <button type="button" onClick={() => setStates({ ...states, [currentStep.id]: { ...currentState, showHint: !currentState.showHint } })} className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold dark:border-slate-700">Mostrar dica</button>}
            {currentState.completed && <button type="button" onClick={nextStep} className="rounded-2xl border border-emerald-300 px-4 py-2 font-semibold text-emerald-700 dark:border-emerald-700 dark:text-emerald-300">Próxima etapa</button>}
          </div>
          {currentState.feedback && <p className={`mt-3 rounded-2xl p-3 text-sm ${currentState.completed ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>{currentState.feedback}</p>}
          {currentState.showHint && <p className="mt-3 rounded-2xl bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">Dica: {currentStep.hint}</p>}
          {currentState.completed && mode === "learning" && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Resolução: {currentStep.reveal}</p>}
        </div>
      )}

      {(completed || mode === "assessment") && (
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <Metric label="Feedback" value={finalFeedback} />
          <Metric label="Erros" value={String(totalErrors)} />
          <Metric label="Tentativas" value={String(totalAttempts)} />
          <Metric label="Acertos" value={`${accuracy}%`} />
        </div>
      )}

      {completed && canShowResult && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">Resultado liberado: {fixedPresentation(result.volume)} u³</p>}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><p className="text-xs uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 text-xl font-black">{value}</p></div>;
}

function fixedPresentation(value: number) {
  return value.toFixed(2);
}
