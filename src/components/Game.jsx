import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useMainContext } from "../contexts/main.js";
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
  console.log("context", context);
  const { current: socket } = useRef(io("http://localhost:3000"));
  usePrepareWebsocket(socket);
  return (
    <>
      <h1>Thats the game: {state?.gameId ?? state?.id}</h1>
      <button className={"btn btn-primary"} onClick={() => sendEvent(socket)}>
        Send event
      </button>
    </>
  );
};

export default Game;
