import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indication
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Start loading

    // Password length check
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post("https://eduverse-backend-15ur.onrender.com/register", 
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (result.data === "Already registered") {
        setError("E-mail already registered! Please log in to proceed.");
        navigate("/login");
      } else {
        alert("Registration successful! Please log in to proceed.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while registering. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };



  return (
    <div className="signup">
      <div className="signup-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* All your form fields remain the same */}
          <div className="input">
          <label htmlFor="name">
             <strong>Name</strong>
           </label>
         <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
          {/* Email and password fields remain the same */}
          
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="link-container">
          <p className="link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <div className="signup-image">
        
      </div>
    </div>
  );
};

export default Signup;
