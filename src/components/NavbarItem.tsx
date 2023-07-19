// src/components/NavBar.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import { Link, To } from "react-router-dom";
import "./NavBarItem.css";

interface NavItemProps {
  children?: ReactNode[] | ReactElement | string;
  to: To;
  className?: string;
  linkClass?: string;
}

export default function NavbarItem({
  children,
  to,
  className: argClass,
  linkClass: argLinkClass,
}: NavItemProps) {
  const className = argClass ? _.split(argClass) : [];
  const linkClass = argLinkClass ? _.split(argLinkClass) : [];

  className.splice(0, 0, "navbar-item");
  linkClass.splice(0, 0, "navbar-item-link");
  return (
    <li className={_.join(className, " ")}>
      <Link className={_.join(linkClass, " ")} to={to || "#"}>
        {children}
      </Link>
    </li>
  );
}
