import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import UserProfil from "./pages/UserProfil";
import App from "./App";
import Map from "./pages/Map";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import Camera from "./pages/Camera";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/user-profil",
    element: <UserProfil />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/galerie",
    element: <Gallery />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
