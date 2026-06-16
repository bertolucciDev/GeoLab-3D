import { solids } from "../../data/solids";

interface Props {
  selected: string;

  onSelect: (
    solidId: string
  ) => void;
}

export function Sidebar({
  selected,
  onSelect,
}: Props) {
  return (
    <aside className="border-r p-4">
      <h2 className="mb-4 font-semibold">
        Sólidos
      </h2>

      <div className="flex flex-col gap-2">
        {solids.map((solid) => (
          <button
            key={solid.id}
            onClick={() =>
              onSelect(solid.id)
            }
            className={`rounded border p-2 ${
              selected === solid.id
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            {solid.name}
          </button>
        ))}
      </div>
    </aside>
  );
}