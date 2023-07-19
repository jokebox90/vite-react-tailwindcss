// src/components/NavBar.tsx

import _ from "lodash-es";
import { ReactNode } from "react";
import "./NavBar.css";

type NavBarProps = {
  children: ReactNode[] | ReactNode;
  className?: string;
};

export default function Navbar({ children, className: argClass }: NavBarProps) {
  const className = argClass ? _.split(argClass) : [];

  className.splice(0, 0, "navbar");
  return <div className={_.join(className, " ")}>{children}</div>;
}
