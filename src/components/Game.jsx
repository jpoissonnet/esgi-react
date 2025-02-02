import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useMainContext } from "../contexts/main.js";
import { Board } from "../modules/game/Board.jsx";

const Game = () => {
  const navigate = useNavigate();
  const { context } = useMainContext();
  if (!context.game) {
    return <Navigate to={"/"} />;
  }
  const { current: socket } = useRef(
    io("https://app-a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io"),
  );
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", { userId: context.user.id, gameId: context.game.id });
    });
    socket.on("play", (data) => {
      console.log("<< play", data);
      setSquares(data.squares);
      setCurrentPlayer(data.player === "X" ? "O" : "X");
    });
    socket.on("message", (data) => {
      console.log("received message", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  const playingAs = context.user.id === context.game.creator ? "X" : "O";
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(false));
  const [winner, setWinner] = useState(null);

  function handlePlay(nextSquares) {
    console.log(">> play");
    socket.emit("play", {
      player: currentPlayer,
      playerId: context.user.id,
      gameId: context.game.id,
      squares: nextSquares,
    });
  }

  function handleWin(w) {
    const dialog = document.getElementById("finish");
    if (w === playingAs) {
      console.log("👋You win", w, playingAs);
    } else {
      console.log("👋You lose", w, playingAs);
    }
    setWinner(w);
    dialog.showModal();
    fetch(
      `https://app-a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io/game/finish/${context.game.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winner: w,
          score: 100,
        }),
      },
    );
  }

  return (
    <>
      <h3>
        I am {context.user.username}, playing as {playingAs}
      </h3>
      <h4>Current player {currentPlayer}</h4>
      {(playingAs === "X" && currentPlayer === "X") ||
      (playingAs === "O" && currentPlayer === "O") ? (
        <h2 className={"text-success"}>It's your turn</h2>
      ) : (
        <h2 className={"text-error"}>It's not your turn</h2>
      )}
      <h1>
        Game id:
        <span
          onClick={() => navigator.clipboard.writeText(context.game.id)}
          className={
            "ml-1 hover:text-secondary hover:underline cursor-pointer active:text-primary"
          }
        >
          {context.game.id}
        </span>
      </h1>
      <Board
        keepFromPlaying={playingAs !== currentPlayer}
        currentPlayer={currentPlayer}
        squares={squares}
        onPlay={handlePlay}
        onWin={handleWin}
      />
      <dialog id="finish" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {winner === playingAs ? "🎉 You win" : "😢 You lose"}
          </h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => navigate("/")}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Game;
