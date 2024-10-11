import "../App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/main.js";

function App() {
  const user = useLoaderData();
  const { context, setContext } = useContext(MainContext);
  useEffect(() => {
    setContext({ ...context, user });
  }, []);
  return (
    context && (
      <>
        <Navbar
          username={user.username}
          initials={user.firstname[0] + user.lastname[0]}
        />
        <Outlet />
      </>
    )
  );
}

export default App;
