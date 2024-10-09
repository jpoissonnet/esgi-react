import { Square } from "./Square.jsx";

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function Board({ keepFromPlaying, currentPlayer, squares, onPlay }) {
  function handleClick(i) {
    if (keepFromPlaying) {
      alert("It's not your turn");
      return;
    }
    if (squares[i]) {
      alert("Square already filled squares[" + i + "] = " + squares[i]);
      return;
    }
    console.log("squares", squares);
    squares[i] = currentPlayer;
    onPlay(squares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (currentPlayer === "X" ? "X" : "O");
  }

  return (
    <section className={"mt-12 flex flex-col items-center"}>
      <div className="status">{status}</div>
      <div className="grid grid-cols-3 gap-2 max-w-80 bg-primary rounded-xl border-transparent border overflow-clip isolate">
        {[...Array(9)].map((_, i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
          />
        ))}
      </div>
    </section>
  );
}
