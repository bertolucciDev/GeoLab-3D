interface Props {
    radius: number;
    height: number;
  }
  
  export function Cone3D({
    radius,
    height,
  }: Props) {
    return (
      <mesh>
        <coneGeometry
          args={[
            Math.max(radius, 0.1),
            Math.max(height, 0.1),
            64,
          ]}
        />
  
        <meshStandardMaterial />
      </mesh>
    );
  }