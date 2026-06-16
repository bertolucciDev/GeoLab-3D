import { useState } from "react";

interface Props {
    fields: {
        id: string;
        label: string;
    }[];

    onSubmit: (
        values: Record<string, number>
    ) => void;
}

export function DynamicForm({fields, onSubmit} : Props) {
    const [values, setValues] = useState<Record<string,number>>({});

    function handleChange(
        field: string,
        value: string
    ) {
        setValues((old) => ({
            ...old,

            [field]: Number(value),
        }))
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()

            onSubmit(values)
        }}
        >
            {fields.map((field) => (
                <div key={field.id}>
                    <label>
                        {field.label}
                    </label>

                    <input 
                        type="number"
                        min={0}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                </div>
            ))}

            <button>
                Calcular
            </button>
        </form>
    )
}