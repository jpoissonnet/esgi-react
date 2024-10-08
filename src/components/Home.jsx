import { useNavigate } from "react-router-dom";
import { useMainContext } from "../contexts/main.js";

const Home = () => {
  const { context } = useMainContext();
  console.log(context);
  const navigate = useNavigate();
  const newGame = async () => {
    const response = await fetch("http://localhost:3000/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId: context.id }),
    });
    const data = await response.json();
    navigate("/game", { state: data });
  };
  const joinGame = async () => {
    const response = await fetch(
      "http://localhost:3000/game/join/8a52771a-7336-4c76-8a48-e9932a9742f7",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: context.id }),
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.error) {
      throw new Error(data.error);
    }
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
          <input type="text" className={"input input-secondary"} />
          <button className="btn btn-secondary" onClick={joinGame}>
            Join game
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
