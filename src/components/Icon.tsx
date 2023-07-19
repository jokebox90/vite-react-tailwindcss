// src/components/LandingNextSection.tsx

import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon(Props: {
  className?: string;
  icon: IconProp;
  size?: SizeProp;
  onClick?: () => void;
}) {
  return (
    <span
      className={`icon flex justify-center items-center ${
        Props.className || ""
      }`}
      onClick={Props.onClick}
    >
      <FontAwesomeIcon icon={Props.icon} size={Props.size || "1x"} />
    </span>
  );
}
