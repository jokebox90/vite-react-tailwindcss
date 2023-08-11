// src/pages/Home.tsx

import { MatomoProvider } from "@datapunt/matomo-tracker-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/fontawesome.ts";
import matomo from "./utils/matomo.ts";
import "./utils/moment.ts";
import { HelmetProvider } from "react-helmet-async";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <HelmetProvider>
    <MatomoProvider value={matomo}>
      <App />
    </MatomoProvider>
  </HelmetProvider>
);
