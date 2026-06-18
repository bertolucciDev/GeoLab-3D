import { Moon, Sun } from "lucide-react";
interface Props { theme: "light" | "dark"; onToggleTheme: () => void; }
export function Header({ theme, onToggleTheme }: Props) {
  return <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div><h1 className="text-2xl font-black tracking-tight">GeoLab 3D</h1><p className="text-sm text-slate-500 dark:text-slate-400">Laboratório visual de Geometria Espacial</p></div><button type="button" onClick={onToggleTheme} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900" aria-label="Alternar tema">{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}</button></div></header>;
}
