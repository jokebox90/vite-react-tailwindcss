// src/pages/Home.tsx

import { MatomoProvider } from "@jonkoops/matomo-tracker-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./utils/fontawesome.ts";
import matomo from "./utils/matomo.ts";
import "./utils/moment.ts";

const root: HTMLDivElement = document.getElementById("root") as HTMLDivElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <MatomoProvider value={matomo}>
        <App />
      </MatomoProvider>
    </HelmetProvider>
  </StrictMode>
);
