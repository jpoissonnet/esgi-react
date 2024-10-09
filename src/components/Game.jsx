import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useMainContext } from "../contexts/main.js";
import { Board } from "../modules/game/Board.jsx";

const Game = () => {
  const { context } = useMainContext();
  if (!context.game) {
    return <Navigate to={"/"} />;
  }
  const { current: socket } = useRef(io("http://localhost:3000"));
  useEffect(() => {
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

  function handlePlay(nextSquares) {
    console.log(">> play");
    socket.emit("play", {
      player: currentPlayer,
      playerId: context.user.id,
      gameId: context.game.id,
      squares: nextSquares,
    });
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
        That's the game:
        <span
          onClick={() => navigator.clipboard.writeText(context.game.id)}
          className={
            "hover:text-secondary hover:underline cursor-pointer active:text-primary"
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
      />
      <button onClick={() => setSquares(Array(9).fill(null))}>
        Reset squares{" "}
      </button>
    </>
  );
};

export default Game;
