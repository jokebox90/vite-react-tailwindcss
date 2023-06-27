// src/App.tsx

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appConfig from "./app.json";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root config={appConfig} />,
    children: [
      {
        index: true,
        name: "home",
        element: <Home />,
      },
      {
        path: "/about",
        name: "about",
        element: <About />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
