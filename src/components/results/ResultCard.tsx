interface Props {
  volume: number;
}

export function ResultCard({ volume }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-2xl shadow-blue-600/20" aria-labelledby="result-title">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">Resultado final</p>
      <h2 id="result-title" className="mt-3 text-4xl font-black sm:text-5xl">{volume.toFixed(2)} u³</h2>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
          <p className="font-bold">Precisão</p>
          <p className="text-blue-100">Cálculo interno sem arredondar.</p>
        </div>
        <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
          <p className="font-bold">Apresentação</p>
          <p className="text-blue-100">Volume exibido com 2 casas decimais.</p>
        </div>
      </div>
    </section>
  );
}
