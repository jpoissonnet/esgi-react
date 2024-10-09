import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useMainContext } from "../contexts/main.js";
import { Board } from "../modules/game/Board.jsx";

const usePrepareWebsocket = (ws) => {
  return useEffect(() => {
    ws.on("connect", () => {
      console.log("connected");
    });
    return () => {
      ws.disconnect();
    };
  }, [ws]);
};

const sendEvent = (ws) => {
  ws.emit("message", "Hello from client");
};

const Game = () => {
  const { context } = useMainContext();
  if (!context.game) {
    return <Navigate to={"/"} />;
  }
  const { current: socket } = useRef(io("http://localhost:3000"));
  usePrepareWebsocket(socket);
  console.log(context);
  const [isItMyTurn, setIsItMyTurn] = useState(
    context.user.id === context.game.creator,
  );
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <>
      {isItMyTurn ? (
        <h2 className={"text-success"}>It's your turn</h2>
      ) : (
        <h2 className={"text-error"}>It's not your turn</h2>
      )}
      <h1
        className={
          "hover:text-secondary hover:underline cursor-pointer active:text-primary"
        }
        onClick={() => navigator.clipboard.writeText(context.game.id)}
      >
        Thats the game: {context.game.id}
      </h1>
      <button className={"btn btn-primary"} onClick={() => sendEvent(socket)}>
        Send event
      </button>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </>
  );
};

export default Game;
