// src/pages/Home.tsx

import { createInstance } from "@jonkoops/matomo-tracker-react";

const instance = createInstance({
  urlBase: "https://matomo.petitboutde.cloud",
  siteId: 1,
  trackerUrl: "https://matomo.petitboutde.cloud/matomo.php",
  srcUrl: "https://matomo.petitboutde.cloud/matomo.js",
  disabled: import.meta.env.VITE_MATOMO_DISABLED !== "false",
  heartBeat: {
    active: true,
    seconds: 10,
  },
  configurations: {
    disableCookies: import.meta.env.VITE_MATOMO_DISABLE_COOKIE !== "false",
    setSecureCookie: import.meta.env.VITE_MATOMO_SET_SECURE_COOKIE !== "false",
    setRequestMethod: "POST",
  },
});

export default instance;
