// src/pages/Home.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./index.css";

library.add(
  fas,
  faFacebook,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedin
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
