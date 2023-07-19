// src/components/LandingNextSection.tsx

import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash-es";
import Icon from "./Icon";
import "./LandingNextSection.css";
import { useRef } from "react";

interface LandingNextSectionProps {
  className?: string;
  iconClass?: string;
  icon?: IconProp;
  size?: SizeProp;
}

export default function LandingNextSection(Props: LandingNextSectionProps) {
  const buttonRef = useRef({} as HTMLDivElement);
  const handleClick = () =>
    buttonRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "end",
    });

  return (
    <div
      ref={buttonRef}
      className={_.trim(`landing-next-section ${Props.className || ""}`)}
      onClick={handleClick}
    >
      <div className="landing-next-section-inner">
        <div className="animate-bounce bg-white w-9 h-9 rounded-full">
          <Icon
            icon={Props.icon || ["fas", "caret-down"]}
            size={Props.size}
            className={Props.iconClass || "text-black"}
          />
        </div>
      </div>
    </div>
  );
}
