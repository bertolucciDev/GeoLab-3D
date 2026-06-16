interface Props {
    steps: string[];
}

export function StepsCard({steps} : Props) {
    return (
        <div>
            <h2>
                Passo a Passo
            </h2>

            {steps.map((step, index) => (
                <p key={index}>
                    {step}
                </p>
            ))}
        </div>
    )
}