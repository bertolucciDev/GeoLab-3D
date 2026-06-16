import type { SolidDefinition } from "../../types/solid";
import { Pi } from "../../utils/pi";

export const cylinder: SolidDefinition = {
    id: "cylinder",

    name: "Cilindro",

    category: "round",

    formula: "V = π x r² x h",

    inputs: [
        {
            id: "radius",
            label: "Raio",
        },

        {
            id: "height",
            label: "Altura",
        },
    ],

    calculate(values) {
        const r = values.radius;

        const h = values.height;

        const volume = Pi * r * r * h;

        return {
            volume,

            steps: [
                "V = π × r² × h",

                `V = 3.14 × ${r}² × ${h}`,

                `V = ${volume.toFixed(2)}`
            ]
        }
    }
}