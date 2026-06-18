export type SolidCategory = "polyhedron" | "round";
export type SolidKind = "sphere" | "cylinder" | "cone" | "prism" | "pyramid";
export type BaseShape = "square" | "rectangle" | "equilateral-triangle" | "isosceles-triangle" | "scalene-triangle" | "regular-hexagon";
export type AppMode = "calculator" | "learning" | "assessment";
export type Difficulty = "easy" | "medium" | "hard";
export type AnswerType = "number" | "choice";

export interface InputField {
  id: string;
  label: string;
  min?: number;
  defaultValue: number;
  unit?: string;
}

export interface LearningOption {
  id: string;
  label: string;
}

export interface LearningStep {
  id: string;
  title: string;
  prompt: string;
  answerType: AnswerType;
  expected: number | string;
  tolerance?: number;
  options?: LearningOption[];
  hint: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  reveal: string;
}

export interface CalculationResult {
  volume: number;
  formula: string;
  substitution: string;
  steps: string[];
  learningSteps: LearningStep[];
}

export interface SolidDefinition {
  id: string;
  name: string;
  category: SolidCategory;
  kind: SolidKind;
  baseShape?: BaseShape;
  formula: string;
  inputs: InputField[];
  calculate: (values: Record<string, number>) => CalculationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  safeValues: Record<string, number>;
}

export interface AttemptLog {
  stepId: string;
  attempts: number;
  errors: number;
  elapsedSeconds: number;
}
