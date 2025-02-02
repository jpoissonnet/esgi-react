import { useNavigate } from "react-router-dom";
import { useMainContext } from "../contexts/main.js";
import { useState } from "react";

const Home = () => {
  const { context, setContext } = useMainContext();
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");
  const newGame = async () => {
    const response = await fetch(
      "https://app_a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io/game",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: context.user.id }),
      },
    );
    const data = await response.json();
    setContext({
      ...context,
      game: { ...data, player: context.user.id, creator: context.user.id },
    });
    navigate("/game");
  };
  const joinGame = async () => {
    const response = await fetch(
      `https://app_a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io/game/join/${gameId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: context.user.id }),
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.error) {
      throw new Error(data.error);
    }
    setContext({ ...context, game: data });
    navigate("/game", { state: data });
  };

  return (
    <section className={"flex flex-col justify-center items-center gap-8"}>
      <h1 className={"text-4xl text-center mt-12 mb-32"}>
        Welcome to the game 🕹️ !
      </h1>
      <div className={"flex flex-col justify-center items-center gap-8"}>
        <button className="btn btn-primary" onClick={newGame}>
          Create a new game
        </button>
        <div className={"flex gap-3"}>
          <input
            onChange={(e) => setGameId(e.target.value)}
            type="text"
            className={"input input-secondary"}
          />
          <button className="btn btn-secondary" onClick={joinGame}>
            Join game
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
