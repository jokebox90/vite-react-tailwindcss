// src/pages/Home.tsx

import { createInstance } from "@jonkoops/matomo-tracker-react";

const instance = createInstance({
  urlBase: import.meta.env.VITE_MATOMO_URL_BASE,
  siteId: Number(import.meta.env.VITE_MATOMO_SITE_ID),
  trackerUrl: import.meta.env.VITE_MATOMO_TRACKER_UR,
  srcUrl: import.meta.env.VITE_MATOMO_SRC_URL,
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
