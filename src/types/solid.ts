export type SolidCategory = "polyhedron" | "round";
export type SolidKind = "sphere" | "cylinder" | "cone" | "prism" | "pyramid";
export type BaseShape = "square" | "rectangle" | "equilateral-triangle" | "isosceles-triangle" | "scalene-triangle" | "regular-hexagon";

export interface InputField {
  id: string;
  label: string;
  min?: number;
  defaultValue: number;
  unit?: string;
}

export interface CalculationResult {
  volume: number;
  formula: string;
  substitution: string;
  steps: string[];
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
