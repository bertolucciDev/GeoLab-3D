interface Props {
    volume: number
}

export function ResultCard({ volume }: Props) {
    return (
        <div>
            <h2>Resultado</h2>

            <h1>
                {volume.toFixed(2)}
                u³
            </h1>
        </div>
    )
}