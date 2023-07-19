// src/components/Copyrights.tsx

import { ReactNode } from "react";
import "./Copyrights.css";

interface CopyrightsProps {
  children: ReactNode[] | ReactNode;
}

export default function Copyrights(Props: CopyrightsProps) {
  return (
    <p className="copyrights">
      &copy; {Props.children}
    </p>
  );
}
