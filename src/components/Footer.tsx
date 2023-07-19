// src/Root.tsx

import { ReactNode } from "react";
import "./Footer.css";

interface FooterProps {
  children: ReactNode[] | ReactNode;
}

export default function Footer(Props: FooterProps) {
  return (
    <footer className="footer">
      {Props.children}
    </footer>
  );
}
