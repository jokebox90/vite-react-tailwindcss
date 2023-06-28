// src/Root.tsx

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

type AppPropsType = {
  config: object;
};

function isDarkSystemDefault() {
  return (
    localStorage?.theme === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export default function Root(Props: AppPropsType) {
  const [darkMode, setDarkMode] = useState(isDarkSystemDefault());

  const toggleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  useLayoutEffect(() => {
    if (darkMode) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      delete localStorage.theme;
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <header className="header dark:header-dark">
        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/about" className="nav-link">
            About
          </NavLink>

          <button onClick={() => toggleDarkMode()} className="nav-link">
            {darkMode ? (
              <FontAwesomeIcon icon={"fa-solid fa-sun" as IconProp} />
            ) : (
              <FontAwesomeIcon icon={"fa-solid fa-moon" as IconProp} />
            )}
          </button>
        </nav>
      </header>
      <main className="main">
        <Outlet context={{ config: Props.config }} />
      </main>
    </>
  );
}
