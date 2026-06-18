import type { BaseShape, CalculationResult, InputField, SolidDefinition } from "../../types/solid";

const PI = 3.14;
const n = (value: number) => Number.isFinite(value) && value > 0 ? value : 1;
const fixed = (value: number) => value.toFixed(2);

const roundSolids: SolidDefinition[] = [
  {
    id: "sphere",
    name: "Esfera",
    category: "round",
    kind: "sphere",
    formula: "V=\\frac{4\\pi r^3}{3}",
    inputs: [{ id: "radius", label: "Raio", defaultValue: 3, unit: "u" }],
    calculate(values) {
      const r = n(values.radius);
      const volume = (4 * PI * r ** 3) / 3;
      return result(volume, "V=\\frac{4\\pi r^3}{3}", `V=\\frac{4\\cdot 3.14\\cdot ${r}^3}{3}`, [`${r}^3=${fixed(r ** 3)}`, `V=\\frac{${fixed(4 * PI * r ** 3)}}{3}`, `V=${fixed(volume)}`]);
    },
  },
  {
    id: "cylinder",
    name: "Cilindro",
    category: "round",
    kind: "cylinder",
    formula: "V=\\pi r^2 h",
    inputs: commonRadiusHeight(),
    calculate(values) {
      const r = n(values.radius); const h = n(values.height);
      const volume = PI * r ** 2 * h;
      return result(volume, "V=\\pi r^2 h", `V=3.14\\cdot ${r}^2\\cdot ${h}`, [`${r}^2=${fixed(r ** 2)}`, `V=3.14\\cdot ${fixed(r ** 2)}\\cdot ${h}`, `V=${fixed(volume)}`]);
    },
  },
  {
    id: "cone",
    name: "Cone",
    category: "round",
    kind: "cone",
    formula: "V=\\frac{\\pi r^2 h}{3}",
    inputs: commonRadiusHeight(),
    calculate(values) {
      const r = n(values.radius); const h = n(values.height);
      const volume = (PI * r ** 2 * h) / 3;
      return result(volume, "V=\\frac{\\pi r^2 h}{3}", `V=\\frac{3.14\\cdot ${r}^2\\cdot ${h}}{3}`, [`${r}^2=${fixed(r ** 2)}`, `V=\\frac{${fixed(PI * r ** 2 * h)}}{3}`, `V=${fixed(volume)}`]);
    },
  },
];

const baseLabels: Record<BaseShape, string> = {
  square: "Quadrada",
  rectangle: "Retangular",
  "equilateral-triangle": "Triangular Equilátera",
  "isosceles-triangle": "Triangular Isósceles",
  "scalene-triangle": "Triangular Escalena",
  "regular-hexagon": "Hexagonal",
};

const baseInputs: Record<BaseShape, InputField[]> = {
  square: [{ id: "side", label: "Lado da base", defaultValue: 3, unit: "u" }],
  rectangle: [{ id: "width", label: "Largura", defaultValue: 4, unit: "u" }, { id: "depth", label: "Profundidade", defaultValue: 2, unit: "u" }],
  "equilateral-triangle": [{ id: "side", label: "Lado do triângulo", defaultValue: 4, unit: "u" }],
  "isosceles-triangle": [{ id: "base", label: "Base do triângulo", defaultValue: 4, unit: "u" }, { id: "triangleHeight", label: "Altura do triângulo", defaultValue: 3, unit: "u" }],
  "scalene-triangle": [{ id: "base", label: "Base do triângulo", defaultValue: 5, unit: "u" }, { id: "triangleHeight", label: "Altura do triângulo", defaultValue: 3, unit: "u" }],
  "regular-hexagon": [{ id: "side", label: "Lado do hexágono", defaultValue: 3, unit: "u" }],
};

function commonRadiusHeight(): InputField[] { return [{ id: "radius", label: "Raio", defaultValue: 2, unit: "u" }, { id: "height", label: "Altura", defaultValue: 5, unit: "u" }]; }
function result(volume: number, formula: string, substitution: string, steps: string[]): CalculationResult { return { volume, formula, substitution, steps }; }

function baseArea(baseShape: BaseShape, values: Record<string, number>) {
  if (baseShape === "square") return { area: n(values.side) ** 2, expr: `${n(values.side)}^2` };
  if (baseShape === "rectangle") return { area: n(values.width) * n(values.depth), expr: `${n(values.width)}\\cdot ${n(values.depth)}` };
  if (baseShape === "regular-hexagon") return { area: (3 * Math.sqrt(3) * n(values.side) ** 2) / 2, expr: `\\frac{3\\sqrt{3}\\cdot ${n(values.side)}^2}{2}` };
  return { area: (n(values.base ?? values.side) * n(values.triangleHeight ?? (Math.sqrt(3) * n(values.side)) / 2)) / 2, expr: `\\frac{${n(values.base ?? values.side)}\\cdot ${fixed(n(values.triangleHeight ?? (Math.sqrt(3) * n(values.side)) / 2))}}{2}` };
}

const polyhedra = (kind: "prism" | "pyramid") => (Object.keys(baseLabels) as BaseShape[]).map((baseShape) => {
  const name = `${kind === "prism" ? "Prisma" : "Pirâmide"} ${baseLabels[baseShape]}`;
  const factor = kind === "prism" ? 1 : 1 / 3;
  return {
    id: `${kind}-${baseShape}`,
    name,
    category: "polyhedron",
    kind,
    baseShape,
    formula: kind === "prism" ? "V=A_b\\cdot h" : "V=\\frac{A_b\\cdot h}{3}",
    inputs: [...baseInputs[baseShape], { id: "height", label: "Altura do sólido", defaultValue: 5, unit: "u" }],
    calculate(values: Record<string, number>) {
      const h = n(values.height);
      const base = baseArea(baseShape, values);
      const volume = base.area * h * factor;
      const formula = kind === "prism" ? "V=A_b\\cdot h" : "V=\\frac{A_b\\cdot h}{3}";
      const substitution = kind === "prism" ? `V=${fixed(base.area)}\\cdot ${h}` : `V=\\frac{${fixed(base.area)}\\cdot ${h}}{3}`;
      return result(volume, formula, substitution, [`A_b=${base.expr}=${fixed(base.area)}`, substitution, `V=${fixed(volume)}`]);
    },
  } satisfies SolidDefinition;
});

export const solids: SolidDefinition[] = [...roundSolids, ...polyhedra("prism"), ...polyhedra("pyramid")];
export const categories = ["round", "polyhedron"] as const;
export const baseShapeLabels = baseLabels;
