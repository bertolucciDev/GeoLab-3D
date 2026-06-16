interface Props {
    radius: number;
    height: number;
  }
  
  export function Cylinder3D({
    radius,
    height,
  }: Props) {
    return (
      <mesh>
        <cylinderGeometry
          args={[
            Math.max(radius, 0.1),
            Math.max(radius, 0.1),
            Math.max(height, 0.1),
            64,
          ]}
        />
  
        <meshStandardMaterial />
      </mesh>
    );
  }