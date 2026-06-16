/// <reference types="@react-three/fiber" />

export function Sphere3D({
    radius,
  }: {
    radius: number;
  }) {
    return (
      <mesh>
        <sphereGeometry
          args={[radius, 64, 64]}
        />
  
        <meshStandardMaterial />
      </mesh>
    );
  }