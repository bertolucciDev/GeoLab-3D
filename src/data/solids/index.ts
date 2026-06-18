import type { BaseShape, CalculationResult, InputField, LearningStep, SolidDefinition } from "../../types/solid";

export const PI = 3.14;
const EPSILON = 0.01;
const fixed = (value: number) => value.toFixed(2);
const positive = (value: number | undefined, fallback: number) => (Number.isFinite(value) && value !== undefined && value >= 0 ? value : fallback);

const formulaOptions = [
  { id: "cylinder", label: "V = πr²h" },
  { id: "cone", label: "V = πr²h / 3" },
  { id: "sphere", label: "V = 4πr³ / 3" },
  { id: "prism", label: "V = Aᵦ × h" },
  { id: "pyramid", label: "V = Aᵦ × h / 3" },
];

function numberStep(id: string, title: string, prompt: string, expected: number, hint: string, reveal: string): LearningStep {
  return {
    id,
    title,
    prompt,
    answerType: "number",
    expected,
    tolerance: EPSILON,
    hint,
    reveal,
    feedbackCorrect: "Correto! Você avançou no raciocínio matemático.",
    feedbackIncorrect: "Ainda não. Revise a operação e tente novamente antes de avançar.",
  };
}

function formulaStep(expected: string, prompt: string, hint: string): LearningStep {
  return {
    id: "formula",
    title: "Escolha da fórmula",
    prompt,
    answerType: "choice",
    expected,
    options: formulaOptions,
    hint,
    reveal: formulaOptions.find((option) => option.id === expected)?.label ?? "",
    feedbackCorrect: "Fórmula correta para este sólido.",
    feedbackIncorrect: "Essa fórmula pertence a outro tipo de sólido. Observe a forma e tente novamente.",
  };
}

function buildResult(volume: number, formula: string, substitution: string, steps: string[], learningSteps: LearningStep[]): CalculationResult {
  return { volume, formula, substitution, steps, learningSteps };
}

function commonRadiusHeight(): InputField[] {
  return [
    { id: "radius", label: "Raio", min: 0, defaultValue: 2, unit: "u" },
    { id: "height", label: "Altura", min: 0, defaultValue: 5, unit: "u" },
  ];
}

const roundSolids: SolidDefinition[] = [
  {
    id: "sphere",
    name: "Esfera",
    category: "round",
    kind: "sphere",
    formula: "V=\\frac{4\\pi r^3}{3}",
    inputs: [{ id: "radius", label: "Raio", min: 0, defaultValue: 3, unit: "u" }],
    calculate(values) {
      const r = positive(values.radius, 0);
      const radiusCubed = r ** 3;
      const numerator = 4 * PI * radiusCubed;
      const volume = numerator / 3;
      return buildResult(
        volume,
        "V=\\frac{4\\pi r^3}{3}",
        `V=\\frac{4\\cdot 3.14\\cdot ${r}^3}{3}`,
        [`r^3=${fixed(radiusCubed)}`, `4\\cdot 3.14\\cdot r^3=${fixed(numerator)}`, `V=${fixed(volume)}`],
        [
          formulaStep("sphere", "Qual fórmula calcula o volume da esfera?", "Esferas usam o cubo do raio e o fator 4/3."),
          numberStep("radius-cubed", `Calcule ${r}³`, "Quanto vale r³?", radiusCubed, "Elevar ao cubo significa multiplicar o raio por ele mesmo três vezes.", `${r}×${r}×${r}=${fixed(radiusCubed)}`),
          numberStep("numerator", "Resolva o numerador", `Quanto vale 4 × 3.14 × ${fixed(radiusCubed)}?`, numerator, "Multiplique primeiro 4 por 3.14 e depois pelo valor de r³.", `4×3.14×${fixed(radiusCubed)}=${fixed(numerator)}`),
          numberStep("volume", "Divida por 3", `Quanto vale ${fixed(numerator)} ÷ 3?`, volume, "A fórmula da esfera divide o numerador por 3.", `${fixed(numerator)}÷3=${fixed(volume)}`),
        ],
      );
    },
  },
  {
    id: "cylinder",
    name: "Cilindro",
    category: "round",
    kind: "cylinder",
    formula: "V=\\pi r^2h",
    inputs: commonRadiusHeight(),
    calculate(values) {
      const r = positive(values.radius, 0);
      const h = positive(values.height, 0);
      const radiusSquared = r ** 2;
      const baseTimesHeight = radiusSquared * h;
      const volume = PI * baseTimesHeight;
      return buildResult(
        volume,
        "V=\\pi r^2h",
        `V=3.14\\cdot ${r}^2\\cdot ${h}`,
        [`r^2=${fixed(radiusSquared)}`, `r^2\\cdot h=${fixed(baseTimesHeight)}`, `V=${fixed(volume)}`],
        [
          formulaStep("cylinder", "Qual fórmula calcula o volume do cilindro?", "Cilindros multiplicam a área circular da base pela altura."),
          numberStep("radius-squared", `Calcule ${r}²`, "Quanto vale r²?", radiusSquared, "Quadrado significa multiplicar o número por ele mesmo.", `${r}×${r}=${fixed(radiusSquared)}`),
          numberStep("base-height", "Combine base e altura", `Quanto vale ${fixed(radiusSquared)} × ${h}?`, baseTimesHeight, "Depois de calcular r², multiplique pela altura do cilindro.", `${fixed(radiusSquared)}×${h}=${fixed(baseTimesHeight)}`),
          numberStep("volume", "Multiplique por π", `Quanto vale 3.14 × ${fixed(baseTimesHeight)}?`, volume, "Use π aproximado como 3.14 e mantenha o cálculo completo até a apresentação.", `3.14×${fixed(baseTimesHeight)}=${fixed(volume)}`),
        ],
      );
    },
  },
  {
    id: "cone",
    name: "Cone",
    category: "round",
    kind: "cone",
    formula: "V=\\frac{\\pi r^2h}{3}",
    inputs: commonRadiusHeight(),
    calculate(values) {
      const r = positive(values.radius, 0);
      const h = positive(values.height, 0);
      const radiusSquared = r ** 2;
      const cylinderVolume = PI * radiusSquared * h;
      const volume = cylinderVolume / 3;
      return buildResult(
        volume,
        "V=\\frac{\\pi r^2h}{3}",
        `V=\\frac{3.14\\cdot ${r}^2\\cdot ${h}}{3}`,
        [`r^2=${fixed(radiusSquared)}`, `3.14\\cdot r^2\\cdot h=${fixed(cylinderVolume)}`, `V=${fixed(volume)}`],
        [
          formulaStep("cone", "Qual fórmula calcula o volume do cone?", "Cones têm um terço do volume do cilindro de mesma base e altura."),
          numberStep("radius-squared", `Calcule ${r}²`, "Quanto vale r²?", radiusSquared, "Quadrado significa multiplicar o número por ele mesmo.", `${r}×${r}=${fixed(radiusSquared)}`),
          numberStep("cylinder-reference", "Resolva πr²h", `Quanto vale 3.14 × ${fixed(radiusSquared)} × ${h}?`, cylinderVolume, "Calcule como se fosse um cilindro antes de dividir por 3.", `3.14×${fixed(radiusSquared)}×${h}=${fixed(cylinderVolume)}`),
          numberStep("volume", "Divida por 3", `Quanto vale ${fixed(cylinderVolume)} ÷ 3?`, volume, "Todo cone divide o produto πr²h por 3.", `${fixed(cylinderVolume)}÷3=${fixed(volume)}`),
        ],
      );
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
  square: [{ id: "side", label: "Lado da base", min: 0, defaultValue: 3, unit: "u" }],
  rectangle: [{ id: "width", label: "Largura", min: 0, defaultValue: 4, unit: "u" }, { id: "depth", label: "Profundidade", min: 0, defaultValue: 2, unit: "u" }],
  "equilateral-triangle": [{ id: "side", label: "Lado do triângulo", min: 0, defaultValue: 4, unit: "u" }],
  "isosceles-triangle": [{ id: "base", label: "Base do triângulo", min: 0, defaultValue: 4, unit: "u" }, { id: "triangleHeight", label: "Altura da base triangular", min: 0, defaultValue: 3, unit: "u" }],
  "scalene-triangle": [{ id: "base", label: "Base do triângulo", min: 0, defaultValue: 5, unit: "u" }, { id: "triangleHeight", label: "Altura da base triangular", min: 0, defaultValue: 3, unit: "u" }],
  "regular-hexagon": [{ id: "side", label: "Lado do hexágono", min: 0, defaultValue: 3, unit: "u" }],
};

function baseArea(baseShape: BaseShape, values: Record<string, number>) {
  const side = positive(values.side, 0);
  const base = positive(values.base, side);
  const triangleHeight = positive(values.triangleHeight, (Math.sqrt(3) * side) / 2);
  if (baseShape === "square") return { area: side ** 2, expression: `${side}^2`, prompt: `Quanto vale ${side}²?`, hint: "A área do quadrado é lado ao quadrado." };
  if (baseShape === "rectangle") {
    const width = positive(values.width, 0);
    const depth = positive(values.depth, 0);
    return { area: width * depth, expression: `${width}\\cdot ${depth}`, prompt: `Quanto vale ${width} × ${depth}?`, hint: "A área do retângulo é largura vezes profundidade." };
  }
  if (baseShape === "regular-hexagon") return { area: (3 * Math.sqrt(3) * side ** 2) / 2, expression: `\\frac{3\\sqrt{3}\\cdot ${side}^2}{2}`, prompt: `Quanto vale a área do hexágono regular de lado ${side}?`, hint: "Use A = 3√3·l²/2 para hexágonos regulares." };
  return { area: (base * triangleHeight) / 2, expression: `\\frac{${base}\\cdot ${fixed(triangleHeight)}}{2}`, prompt: `Quanto vale (${base} × ${fixed(triangleHeight)}) ÷ 2?`, hint: "A área da base triangular usa a base do triângulo vezes a altura da base triangular, dividido por 2." };
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
    inputs: [...baseInputs[baseShape], { id: "height", label: "Altura 3D do sólido", min: 0, defaultValue: 5, unit: "u" }],
    calculate(values: Record<string, number>) {
      const h = positive(values.height, 0);
      const base = baseArea(baseShape, values);
      const product = base.area * h;
      const volume = product * factor;
      const formula = kind === "prism" ? "V=A_b\\cdot h" : "V=\\frac{A_b\\cdot h}{3}";
      const substitution = kind === "prism" ? `V=${fixed(base.area)}\\cdot ${h}` : `V=\\frac{${fixed(base.area)}\\cdot ${h}}{3}`;
      const learningSteps: LearningStep[] = [
        formulaStep(kind, `Qual fórmula calcula o volume de ${name.toLowerCase()}?`, kind === "prism" ? "Prismas multiplicam a área da base pela altura." : "Pirâmides usam a área da base vezes a altura e depois dividem por 3."),
        numberStep("base-area", "Calcule a área da base", base.prompt, base.area, base.hint, `A_b=${base.expression}=${fixed(base.area)}`),
        numberStep("base-height", "Multiplique pela altura", `Quanto vale ${fixed(base.area)} × ${h}?`, product, "Agora conecte a área da base bidimensional com a altura 3D do sólido.", `${fixed(base.area)}×${h}=${fixed(product)}`),
      ];
      if (kind === "pyramid") {
        learningSteps.push(numberStep("volume", "Divida por 3", `Quanto vale ${fixed(product)} ÷ 3?`, volume, "Pirâmides ocupam um terço do prisma correspondente.", `${fixed(product)}÷3=${fixed(volume)}`));
      }
      return buildResult(volume, formula, substitution, [`A_b=${base.expression}=${fixed(base.area)}`, `A_b\\cdot h=${fixed(product)}`, `V=${fixed(volume)}`], learningSteps);
    },
  } satisfies SolidDefinition;
});

export const solids: SolidDefinition[] = [...roundSolids, ...polyhedra("prism"), ...polyhedra("pyramid")];
export const baseShapeLabels = baseLabels;
