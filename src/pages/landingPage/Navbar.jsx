
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../../assets/Logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} className="img"/>
          EduVerse</div>
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
