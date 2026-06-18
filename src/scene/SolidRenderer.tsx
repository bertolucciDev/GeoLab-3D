import type { SolidDefinition } from "../types/solid";

interface Props {
  solid: SolidDefinition;
  values: Record<string, number>;
}

const v = (values: Record<string, number>, key: string, fallback: number) => Math.max(values[key] ?? fallback, 0.1);
export function SolidRenderer({ solid, values }: Props) {
  const side = v(values, "side", 3);
  const height = v(values, "height", 4);
  const radius = v(values, "radius", 2);
  const width = v(values, "length", v(values, "width", side));
  const depth = v(values, "width", side);
  const color = solid.kind === "pyramid" ? "#38bdf8" : solid.kind === "prism" ? "#2563eb" : "#60a5fa";

  if (solid.kind === "sphere") return <mesh><sphereGeometry args={[radius, 48, 48]} /><meshStandardMaterial color={color} roughness={0.35} metalness={0.1} /></mesh>;
  if (solid.kind === "cylinder") return <mesh><cylinderGeometry args={[radius, radius, height, 64]} /><meshStandardMaterial color={color} roughness={0.35} metalness={0.1} /></mesh>;
  if (solid.kind === "cone") return <mesh><coneGeometry args={[radius, height, 64]} /><meshStandardMaterial color={color} roughness={0.35} metalness={0.1} /></mesh>;
  if (solid.kind === "pyramid") return <mesh><coneGeometry args={[Math.max(width, depth, side) / 1.35, height, solid.baseShape === "regular-hexagon" ? 6 : solid.baseShape?.includes("triangle") ? 3 : 4]} /><meshStandardMaterial color={color} roughness={0.4} /></mesh>;
  return <mesh scale={[width / 2, height, depth / 2]}><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={color} roughness={0.4} /></mesh>;
}
