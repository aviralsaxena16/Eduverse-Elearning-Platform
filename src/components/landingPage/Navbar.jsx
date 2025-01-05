
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">EduVerse</div>
      <ul className="nav-links">
        <li><a href="#login">Login</a></li>
        <li><a href="#register">Register</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
