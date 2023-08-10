// src/App.tsx

import { createBrowserRouter } from "react-router-dom";
import appConfig from "./app.json";
import Root from "./pages/Root";
import Home from "./pages/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root config={appConfig} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
