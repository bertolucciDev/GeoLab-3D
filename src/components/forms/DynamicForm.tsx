import { useState } from "react";

interface Props {
  fields: {
    id: string;
    label: string;
  }[];

  onSubmit: (
    values: Record<string, number>
  ) => void;

  onValuesChange?: (
    values: Record<string, number>
  ) => void;
}

export function DynamicForm({
  fields,
  onSubmit,
  onValuesChange,
}: Props) {
  const [values, setValues] =
    useState<Record<string, number>>({});

  function handleChange(
    field: string,
    value: string
  ) {
    const next = {
        ...values,
        [field]: Number(value),
    };

    setValues(next)

    onValuesChange?.(next)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="flex flex-col gap-4"
    >
      {fields.map((field) => (
        <div
          key={field.id}
          className="flex flex-col gap-1"
        >
          <label className="font-medium">
            {field.label}
          </label>

          <input
            type="number"
            required
            min={0}
            step="any"
            className="rounded-md border p-2"
            onChange={(e) =>
              handleChange(
                field.id,
                e.target.value
              )
            }
          />
        </div>
      ))}

      <button
        type="submit"
        className="rounded-md border p-2 font-medium"
      >
        Calcular
      </button>
    </form>
  );
}