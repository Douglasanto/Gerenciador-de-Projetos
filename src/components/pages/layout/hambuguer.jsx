import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../../../index.css";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu">
          <ul>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projetos" onClick={() => setIsOpen(false)}>
                Projetos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
