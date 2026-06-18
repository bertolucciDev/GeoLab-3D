import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
interface Props { children: ReactNode; }
export function SceneCanvas({ children }: Props) {
  return <section className="card overflow-hidden" aria-label="Visualização 3D"><div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800"><div><h2 className="font-semibold">Visualização 3D</h2><p className="text-sm text-slate-500 dark:text-slate-400">Orbitar, zoom e pan habilitados</p></div><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">Tempo real</span></div><div className="h-[360px] sm:h-[460px]"><Canvas camera={{ position: [6, 5, 7], fov: 45 }}><ambientLight intensity={1.5} /><directionalLight position={[6, 8, 6]} intensity={2.4} /><gridHelper args={[16, 16, "#94a3b8", "#cbd5e1"]} />{children}<Html position={[-3.8, 2.8, 0]}><div className="rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold shadow dark:bg-slate-900/90">Altura • Base • Raio • Arestas</div></Html><OrbitControls enablePan enableZoom enableRotate makeDefault /></Canvas></div></section>;
}
