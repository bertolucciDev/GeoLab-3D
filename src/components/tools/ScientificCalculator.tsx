import { useMemo, useState } from "react";

const buttons = [
  "sin", "cos", "tan", "√", "⌫",
  "log", "ln", "^", "(", ")",
  "7", "8", "9", "÷", "π",
  "4", "5", "6", "×", "e",
  "1", "2", "3", "-", "%",
  "0", ".", "=", "+", "C",
];

const functions: Record<string, string> = {
  sin: "sin(",
  cos: "cos(",
  tan: "tan(",
  log: "log(",
  ln: "ln(",
  "√": "√(",
};

export function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const preview = useMemo(() => expression || "Digite uma operação", [expression]);

  function press(value: string) {
    if (value === "C") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "⌫") {
      setExpression((current) => current.slice(0, -1));
      return;
    }

    if (value === "=") {
      calculate();
      return;
    }

    setExpression((current) => `${current}${functions[value] ?? value}`);
  }

  function calculate() {
    const normalized = normalizeExpression(expression);
    if (!normalized) {
      setResult("0");
      return;
    }

    if (!/^[\d+\-*/().,%\sA-Za-z_]+$/.test(normalized)) {
      setResult("Expressão inválida");
      return;
    }

    try {
      const value = Function(`"use strict"; return (${normalized})`)();
      setResult(Number.isFinite(value) ? Number(value).toFixed(6).replace(/\.0+$|(?<=\.\d*?)0+$/g, "") : "Indefinido");
    } catch {
      setResult("Confira a expressão");
    }
  }

  return (
    <section className="card p-5" aria-labelledby="scientific-calculator-title">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">Apoio lateral</p>
          <h2 id="scientific-calculator-title" className="text-xl font-black">Calculadora científica</h2>
        </div>
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-200">rad</span>
      </div>

      <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right dark:border-slate-700 dark:bg-slate-950">
        <p className="min-h-6 break-words text-sm text-slate-500 dark:text-slate-400">{preview}</p>
        <p className="mt-2 break-words text-3xl font-black text-slate-950 dark:text-white">{result}</p>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {buttons.map((button) => (
          <button
            key={button}
            type="button"
            onClick={() => press(button)}
            className={`rounded-2xl px-3 py-3 text-sm font-bold transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${button === "=" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : button === "C" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200" : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"}`}
          >
            {button}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
        Use para conferir potências, raízes, porcentagens, logaritmos e trigonometria enquanto resolve as etapas.
      </p>
    </section>
  );
}

function normalizeExpression(expression: string) {
  return expression
    .replace(/π/g, "Math.PI")
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/\^/g, "**")
    .replace(/√/g, "Math.sqrt")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bsin\(/g, "Math.sin(")
    .replace(/\bcos\(/g, "Math.cos(")
    .replace(/\btan\(/g, "Math.tan(")
    .replace(/\blog\(/g, "Math.log10(")
    .replace(/\bln\(/g, "Math.log(")
    .trim();
}
