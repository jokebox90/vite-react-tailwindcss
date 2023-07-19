// src/components/NavBar.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import "./NavBarMenu.css";

type NavMenuProps = {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  menuClass?: string;
};

export default function NavbarMenu({
  children,
  className: argClass,
  menuClass: argMenuClass,
}: NavMenuProps) {
  const className = argClass ? _.split(argClass) : [];
  const menuClass = argMenuClass ? _.split(argMenuClass) : [];

  className.splice(0, 0, "navbar-menu");
  menuClass.splice(0, 0, "navbar-menu-inner");
  return (
    <div className={_.join(className, " ")}>
      <ul className={_.join(menuClass, " ")}>{children}</ul>
    </div>
  );
}
