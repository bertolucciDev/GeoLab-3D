import type { ReactNode } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Props {
  children: ReactNode;
}

export function SceneCanvas({
  children,
}: Props) {
  return (
    <div className="h-[500px] w-full rounded-xl border">
      <Canvas
        camera={{
          position: [5, 5, 5],
          fov: 50,
        }}
      >
        <ambientLight intensity={2} />

        <directionalLight
          position={[10, 10, 10]}
          intensity={2}
        />

        <gridHelper args={[20, 20]} />

        {children}

        <OrbitControls />
      </Canvas>
    </div>
  );
}