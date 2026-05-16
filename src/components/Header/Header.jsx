import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import Data from "../../data/Data";

const Header = () => {
  const [toggel, setToggel] = useState(false);
  const [activeSection, setActiveSection] = useState(Data[0]?.heading || "");
  const location = useLocation();
  const path = location.pathname.substring(1);
  const activeProject = Data.find((item) => item.appBtn === path);

  useEffect(() => {
    if (path.length > 0) {
      setActiveSection("");
      return undefined;
    }

    function updateActiveSection() {
      const scrollPosition = window.scrollY + 140;
      const currentSection = Data.reduce((current, item) => {
        const section = document.getElementById(item.heading);
        if (section && section.offsetTop <= scrollPosition) {
          return item.heading;
        }
        return current;
      }, Data[0]?.heading || "");

      setActiveSection(currentSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [path]);

  const scrollTo = (id) => {
    const scroll = document.getElementById(id);
    window.scrollTo({
      top: scroll?.offsetTop ? scroll?.offsetTop - 100 : 100,
      left: 0,
      behavior: "smooth",
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="nav-container glass">
      <div className="wrapper">
        <div className="left-group">
          {path.length > 0 && (
            <Link to="/" className="go-back-btn" onClick={scrollToTop}>
              <span className="arrow">←</span>
              <span className="text">Go Back</span>
            </Link>
          )}
          <Link
            className="nav-logo gradient-text"
            to="/"
            onClick={() => {
              (scrollToTop(), setToggel(false));
            }}
          >
            UMAIR.
          </Link>
        </div>
        <div className={toggel ? "nav-menu show glass" : "nav-menu"}>
          {path.length === 0 &&
            Data.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  (scrollTo(`${item.heading}`), setToggel(false));
                }}
                className={`nav-link ${activeSection === item.heading ? "active" : ""}`}
                aria-current={activeSection === item.heading ? "page" : undefined}
              >
                {item.heading}
              </button>
            ))}
          {path.length > 0 && activeProject && (
            <span className="nav-link active current-app" aria-current="page">
              {activeProject.heading}
            </span>
          )}
        </div>
        {path.length === 0 && (
          <button
            type="button"
            onClick={() => setToggel(!toggel)}
            className="nav-toggel-btn"
            aria-label={toggel ? "Close navigation menu" : "Open navigation menu"}
          >
            {toggel ? <>&#215;</> : <>&equiv;</>}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
