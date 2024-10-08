import "../App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function App() {
  const user = useLoaderData();
  console.log(user);
  return (
    <>
      <Navbar username={user.username} />
      <Outlet />
    </>
  );
}

export default App;
