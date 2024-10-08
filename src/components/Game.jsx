import { useLocation } from "react-router-dom";

const Game = () => {
  const { state } = useLocation();
  console.log(state);
  return <div>Thats the game: {state?.gameId}</div>;
};

export default Game;
