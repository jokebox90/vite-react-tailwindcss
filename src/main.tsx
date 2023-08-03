// src/pages/Home.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";
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
import { MatomoProviderProps } from "@datapunt/matomo-tracker-react/lib/MatomoProvider";

library.add(fas, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedin);

const instance = createInstance({
  urlBase: "https://matomo.petitboutde.cloud",
  siteId: 1,
  trackerUrl: "https://matomo.petitboutde.cloud/matomo.php",
  srcUrl: "https://matomo.petitboutde.cloud/matomo.js",
  disabled: false,
  heartBeat: {
    active: true,
    seconds: 10,
  },
  configurations: {
    disableCookies: false,
    setSecureCookie: true,
    setRequestMethod: "POST",
  },
});

const matomoProps = {
  value: instance,
} as MatomoProviderProps;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MatomoProvider {...matomoProps}>
      <App />
    </MatomoProvider>
  </React.StrictMode>
);
