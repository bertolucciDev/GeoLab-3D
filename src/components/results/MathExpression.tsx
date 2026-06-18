interface Props {
  value: string;
}

export function MathExpression({ value }: Props) {
  return <code className="inline-block rounded-xl bg-blue-50 px-3 py-2 font-serif text-blue-800 dark:bg-blue-500/10 dark:text-blue-200">{formatMathExpression(value)}</code>;
}

function formatMathExpression(value: string) {
  return value
    .replace(/\\sqrt\{3\}/g, "√3")
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1) ÷ $2")
    .replace(/\\cdot/g, " × ")
    .replace(/\\pi/g, "π")
    .replace(/A_b/g, "Aᵦ")
    .replace(/\^2/g, "²")
    .replace(/\^3/g, "³")
    .replace(/\s+/g, " ")
    .trim();
}
