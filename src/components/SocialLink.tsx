// src/Root.tsx

import Icon from "../components/Icon";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import "./SocialLink.css";

interface SocialLinkProps {
  icon: IconName;
  styles?: string;
}

const colorClassNames: {
  [key: string]: string;
} = {
  default: "social-link-default",
  blue: "social-link-blue",
  pink: "social-link-pink",
  cyan: "social-link-cyan",
  sky: "social-link-sky",
};

export default function SocialLink(Props: SocialLinkProps) {
  return (
    <Icon
      icon={["fab", Props.icon]}
      className={`social-link ${colorClassNames[Props.styles || "default"]}`}
      size="2x"
    />
  );
}
