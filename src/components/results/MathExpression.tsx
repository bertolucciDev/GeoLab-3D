interface Props { value: string; }
export function MathExpression({ value }: Props) {
  return <code className="inline-block rounded-xl bg-blue-50 px-3 py-2 font-serif text-blue-800 dark:bg-blue-500/10 dark:text-blue-200">{value}</code>;
}
