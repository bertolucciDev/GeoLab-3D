import type { SolidDefinition } from "../../types/solid";
import { Pi } from "../../utils/pi";

export const sphere: SolidDefinition = {
    id: "sphere",

    name: "Esfera",

    category: "round",

    formula: "V = (4 x π x r³) ÷ 3",

    inputs: [
        {
            id: "radius",
            label: "Raio",
        },
    ],

    calculate(values) {
        const r = values.radius;

        const volume = (4 * Pi * Math.pow(r, 3)) / 3;

        return {
            volume,

            steps: [
                "V = (4 × π × r³) ÷ 3",

                `V = (4 × 3.14 × ${r}³) ÷ 3`,

                `V = ${volume.toFixed(2)}`
            ]
        }
    }
}