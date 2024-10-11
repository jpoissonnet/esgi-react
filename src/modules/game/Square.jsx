import { clsx } from "clsx";

export function Square({ value, onSquareClick }) {
  return (
    <button
      className={clsx(
        "square min-w-40 aspect-square bg-primary-content text-6xl font-black transition-all",
        "filter hover:brightness-110",
        {
          "text-error": value === "X",
          "text-accent": value === "O",
        },
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
