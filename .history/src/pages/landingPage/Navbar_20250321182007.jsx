import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from '../../assets/Logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-active' : ''}`}>
      <div className="logo">
        <img src={logo} className="img" alt="EduVerse Logo" />
        EduVerse
      </div>
      
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul className="nav-links">
        <li>
          <NavLink 
            to="/login" 
            className="nav-link" 
            onClick={closeMenu}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/register" 
            className="nav-link" 
            onClick={closeMenu}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;