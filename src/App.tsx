// src/App.tsx

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appConfig from "./app.json";
import Root from "./pages/Root";
import Home from "./pages/Home";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import { useLayoutEffect } from "react";

const router = createBrowserRouter([
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

export default function App() {
  return <RouterProvider router={router} />;
}
