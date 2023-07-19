// src/Root.tsx

import { ReactNode } from "react";
import "./SocialLinkGroup.css";

interface SocialLinkGroupProps {
  children: ReactNode[] | ReactNode;
}

export default function SocialLinkGroup(Props: SocialLinkGroupProps) {
  return (
    <p className="social-link-group">
      {Props.children}
    </p>
  );
}
