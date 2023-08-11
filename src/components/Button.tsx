// src/components/Button.tsx

import { ReactNode, Ref } from "react";
import { useMatomo } from "@jonkoops/matomo-tracker-react";

interface ButtonProps {
  title?: string;
  className?: string;
  eventCategory: string;
  eventAction: string;
  onClick: () => void;
  children: ReactNode[] | ReactNode;
  buttonRef?: Ref<HTMLButtonElement>;
}

export default function Button({
  eventCategory,
  eventAction,
  onClick,
  children,
  buttonRef,
  ...otherProps
}: ButtonProps) {
  const { trackEvent } = useMatomo();
  const trackOptions = { category: eventCategory, action: eventAction };

  const handleClick = () => {
    trackEvent(trackOptions);
    onClick();
  };

  return (
    <button onClick={handleClick} ref={buttonRef} {...otherProps}>
      {children}
    </button>
  );
}
