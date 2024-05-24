import HamburgerMenu from "./layout/hambuguer";
import "./../../index.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <HamburgerMenu />
      <ul>
        <li>
          <Link to="https://github.com/Douglasanto">
            <FaGithub />
          </Link>
        </li>

        <li>
          <Link to="https://www.linkedin.com/in/douglassanto/">
            <FaLinkedin />
          </Link>
        </li>
      </ul>
      <p>
        <span>Gerenciador</span> 2024
      </p>
    </nav>
  );
}

export default NavBar;
