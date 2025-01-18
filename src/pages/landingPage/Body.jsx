
import { NavLink } from "react-router-dom";
import "./Body.css";

import cover from "../../assets/cover.jpeg"; // Import the cover image
const Body = () => {
  return (
    <div className="body-section">
      <div className="image-section">
        {/* Use the imported cover image */}
        <img src={cover} alt="Cover" className="cover-image" />
      </div>
      <div className="intro">
        <h1>Welcome to EduVerse!</h1>
        <p>
        
          EduVerse is an innovative online learning platform designed to bring education to your fingertips. We offer a wide range of courses in various fields, taught by industry experts.  Join our community and embark on your educational journey today!
        </p>
        <button className="sign-in-btn"> <NavLink to="/register" className="nav-link" activeClassName="active">
            Register
          </NavLink></button>

      </div>
    </div>
  );
};

export default Body;
