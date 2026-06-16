interface Props {
    radius: number;
  }
  
  export function Sphere3D({
    radius,
  }: Props) {
    return (
      <mesh>
        <sphereGeometry
          args={[
            Math.max(radius, 0.1),
            64,
            64,
          ]}
        />
  
        <meshStandardMaterial />
      </mesh>
    );
  }