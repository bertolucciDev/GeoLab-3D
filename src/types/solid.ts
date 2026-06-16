export interface InputField {
    id: string;
    label: string;
    min?: number;
}

export interface CalculationResult {
    volume: number;
    steps: string[];
}

export interface SolidDefinition {
    id: string;

    name: string;

    category:
        | "polyhedron"
        | "round";
    
    formula: string;

    inputs: InputField[];

    calculate: (
        values: Record<string, number>
    ) => CalculationResult;
}