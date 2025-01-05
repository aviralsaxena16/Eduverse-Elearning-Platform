
import "./Body.css";

const Body = () => {
  return (
    <div className="body-section">
      <div className="intro">
        <h1>Welcome to EduVerse</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates animi labore distinctio fugit velit optio, sit dolores. Nam voluptatum illum sequi et, quo facere eveniet, rem exercitationem minus, voluptates consectetur.</p>
        <button className="sign-in-btn">Sign In</button>
      </div>
      <div className="image-section">
        <img src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&auto=format%2Ccompress&w=640" alt="Image" />
      </div>
    </div>
  );
};

export default Body;
