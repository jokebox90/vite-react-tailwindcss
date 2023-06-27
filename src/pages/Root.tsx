// src/Root.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

type AppPropsType = {
  config: object;
};

export default function Root(Props: AppPropsType) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = null;
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // if (
  //   localStorage.theme === "dark" ||
  //   (!("theme" in localStorage) &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches)
  // ) {
  //   setDarkMode(true);
  // } else {
  //   setDarkMode(false);
  // }

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

          <button onClick={toggleDarkMode} className="nav-link">
            {darkMode ? (
              <FontAwesomeIcon icon="fa-solid fa-sun" />
            ) : (
              <FontAwesomeIcon icon="fa-solid fa-moon" />
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
