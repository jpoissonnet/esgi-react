import { useLocation } from "react-router-dom";
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
  const { state } = useLocation();
  const { context } = useMainContext();
  // console.log("context", context);
  const { current: socket } = useRef(io("http://localhost:3000"));
  usePrepareWebsocket(socket);

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
      <h1>Thats the game: {state?.gameId ?? state?.id}</h1>
      <button className={"btn btn-primary"} onClick={() => sendEvent(socket)}>
        Send event
      </button>
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
    </>
  );
};

export default Game;
