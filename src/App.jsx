import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <main className="">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
