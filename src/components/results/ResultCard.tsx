interface Props {
    volume: number;
  }
  
  export function ResultCard({
    volume,
  }: Props) {
    return (
      <div className="rounded border p-4">
        <h2 className="mb-2 text-xl font-bold">
          Resultado
        </h2>
  
        <p className="text-3xl">
          {volume.toFixed(2)} u³
        </p>
      </div>
    );
  }