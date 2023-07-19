// src/components/NavBar.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import { Link, To } from "react-router-dom";
import "./NavBarBrand.css";

interface NavBrandProps {
  children?: ReactNode[] | ReactElement | string;
  to?: To;
  className?: string;
  linkClass?: string;
}

export default function NavbarBrand({
  children,
  to,
  className: argClass,
  linkClass: argLinkClass,
}: NavBrandProps) {
  const className = argClass ? _.split(argClass) : [];
  const linkClass = argLinkClass ? _.split(argLinkClass) : [];

  className.splice(0, 0, "navbar-brand");
  linkClass.splice(0, 0, "navbar-brand-link");
  return (
    <div className={_.join(className, " ")}>
      <Link to={to || `/`} className={_.join(linkClass, " ")}>
        {children}
      </Link>
    </div>
  );
}