// src/Root.tsx

import { NavLink, Outlet } from "react-router-dom";

type AppPropsType = {
  config: object;
};

export default function Root(Props: AppPropsType) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <NavLink
            to="/"
            className="nav-link"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link"
          >
            About
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet context={{ config: Props.config }} />
      </main>
    </>
  );
}
