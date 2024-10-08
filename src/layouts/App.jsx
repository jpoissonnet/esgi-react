import "../App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/main.js";

function App() {
  const user = useLoaderData();
  const { setContext } = useContext(MainContext);
  useEffect(() => {
    setContext(user);
  }, []);
  return (
    <>
      <Navbar username={user.username} />
      <Outlet />
    </>
  );
}

export default App;
