import type { InputField, ValidationResult } from "../types/solid";

export function validateValues(fields: InputField[], values: Record<string, number>): ValidationResult {
  const errors: string[] = [];
  const safeValues: Record<string, number> = {};

  for (const field of fields) {
    const rawValue = values[field.id];
    const minimum = field.min ?? 0;

    if (rawValue === undefined || rawValue === null || Number.isNaN(rawValue)) {
      errors.push(`${field.label} precisa ser preenchido.`);
      safeValues[field.id] = field.defaultValue;
      continue;
    }

    if (!Number.isFinite(rawValue)) {
      errors.push(`${field.label} precisa ser um número finito.`);
      safeValues[field.id] = field.defaultValue;
      continue;
    }

    if (rawValue < minimum) {
      errors.push(`${field.label} deve ser maior ou igual a ${minimum}.`);
      safeValues[field.id] = minimum;
      continue;
    }

    safeValues[field.id] = rawValue;
  }

  return { isValid: errors.length === 0, errors, safeValues };
}

export function isAcceptableAnswer(expected: number | string, answer: string, tolerance = 0.01) {
  if (typeof expected === "string") return answer === expected;
  const numericAnswer = Number(answer.replace(",", "."));
  return Number.isFinite(numericAnswer) && Math.abs(numericAnswer - expected) <= tolerance;
}
