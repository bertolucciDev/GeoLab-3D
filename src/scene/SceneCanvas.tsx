import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import type { SolidDefinition } from "../types/solid";

interface Props {
  children: ReactNode;
  solid: SolidDefinition;
  values: Record<string, number>;
}

export function SceneCanvas({ children, solid, values }: Props) {
  const height = values.height;
  const radius = values.radius;
  const base = values.side ?? values.length ?? values.base;
  return (
    <section className="card overflow-hidden" aria-label="Visualização 3D educacional">
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <div>
          <h2 className="font-semibold">Visualização 3D educacional</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Linhas auxiliares acompanham os mesmos valores do cálculo.</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">Fonte única</span>
      </div>
      <div className="h-[360px] sm:h-[460px]">
        <Canvas camera={{ position: [6, 5, 7], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[6, 8, 6]} intensity={2.4} />
          <gridHelper args={[16, 16, "#94a3b8", "#cbd5e1"]} />
          {children}
          <Html position={[-4.2, 3, 0]}>
            <div className="grid gap-1 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold shadow dark:bg-slate-900/90">
              {radius !== undefined && <span>Raio = {radius}</span>}
              {height !== undefined && <span>Altura = {height.toFixed(2)}</span>}
              {base !== undefined && <span>Base = {base}</span>}
              <span>Arestas e escala: {solid.name}</span>
            </div>
          </Html>
          <OrbitControls enablePan enableZoom enableRotate makeDefault />
        </Canvas>
      </div>
    </section>
  );
}
