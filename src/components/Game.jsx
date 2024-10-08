import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const prepareWebsocket = (ws) => {
  console.log(ws);
  ws.onopen = () => {
    console.log("connected");
  };
  ws.onmessage = (event) => {
    console.log(event.data);
  };
  ws.onerror = (error) => {
    console.error(error);
  };
  return () => {
    ws.close();
  };
};

const sendEvent = (ws) => {
  console.log("sending event");
  ws.send("pouet");
};
const Game = () => {
  const { state } = useLocation();
  const { current: ws } = useRef(new WebSocket("ws://localhost:8080"));
  useEffect(() => {
    return prepareWebsocket(ws);
  }, []);
  return (
    <>
      <h1>Thats the game: {state?.gameId}</h1>
      <button className={"btn btn-primary"} onClick={() => sendEvent(ws)}>
        Send event
      </button>
    </>
  );
};

export default Game;
