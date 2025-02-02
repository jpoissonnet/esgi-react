import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import App from "./layouts/App.jsx";
import Auth from "./layouts/Auth.jsx";
import Root from "./Root.jsx";
import Home from "./components/Home.jsx";
import Game from "./components/Game.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return redirect("/login");
      }
      const response = await fetch(
        "https://app_a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io:8080/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Unauthorized");
      }
      return await response.json();
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
  {
    element: <Auth />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Root>
    <RouterProvider router={router} />
  </Root>,
);
