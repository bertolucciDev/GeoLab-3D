interface Props { volume: number; }
export function ResultCard({ volume }: Props) {
  return <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-2xl shadow-blue-600/20"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Resultado final</p><p className="mt-3 text-4xl font-black sm:text-5xl">{volume.toFixed(2)} u³</p><p className="mt-2 text-blue-100">Volume calculado com precisão educacional.</p></section>;
}
