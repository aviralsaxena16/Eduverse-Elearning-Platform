
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">EduVerse</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/login" className="nav-link" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="nav-link" activeClassName="active">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
