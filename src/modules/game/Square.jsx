export function Square({ value, onSquareClick }) {
  return (
    <button
      className="square min-w-16 aspect-square bg-primary-content"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
