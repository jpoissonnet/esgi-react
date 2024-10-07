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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const hasThingsInLocalStorage = localStorage.getItem("users");
      if (!hasThingsInLocalStorage) {
        throw redirect("/login");
      }
      return {};
    },
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
  <StrictMode>
    <Root>
      <RouterProvider router={router} />
    </Root>
  </StrictMode>,
);
