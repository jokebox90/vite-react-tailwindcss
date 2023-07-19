// src/Root.tsx

import { ReactNode } from "react";

interface FooterLinkProps {
  children: ReactNode[] | ReactNode;
}

export default function FooterLink(Props: FooterLinkProps) {
  return <span>{Props.children}</span>;
}
