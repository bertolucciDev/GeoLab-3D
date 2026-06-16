import { Sphere3D } from "./Sphere3D";
import { Cylinder3D } from "./Cylinder3D";
import { Cone3D } from "./Cone3D";

interface Props {
  solidId: string;

  values: Record<string, number>;
}

export function SolidRenderer({
  solidId,
  values,
}: Props) {
  switch (solidId) {
    case "sphere":
      return (
        <Sphere3D
          radius={
            values.radius || 1
          }
        />
      );

    case "cylinder":
      return (
        <Cylinder3D
          radius={
            values.radius || 1
          }
          height={
            values.height || 1
          }
        />
      );

    case "cone":
      return (
        <Cone3D
          radius={
            values.radius || 1
          }
          height={
            values.height || 1
          }
        />
      );

    default:
      return null;
  }
}