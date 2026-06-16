import type { SolidDefinition } from "../../types/solid";
import { Pi } from "../../utils/pi";
import { Volume } from "../../utils/volume";

export const cone: SolidDefinition = {
    id: "cone",
    name: "Cone",

    category: "round",

    formula: "(π × r² × h) ÷ 3",

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

        const volume = Volume(Pi, r, h);
        return {
            volume,

            steps: [
                "(π × r² × h) ÷ 3",

                `(3.14 × ${r}² × ${h}) ÷ 3`,

                `${volume.toFixed(2)}`
            ]
        }
    },
}