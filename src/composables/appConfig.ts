// src/composables/appConfig.tsx

import { useOutletContext } from "react-router-dom";

type ContextType = {
  config: {
    projectName: string;
    projectLogo: string;
  };
};

export function useAppConfig() {
  return useOutletContext<ContextType>();
}