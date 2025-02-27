import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from '../../assets/logo.png'
import { useAuth } from "../../context/context.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors
    setLoading(true); // Start loading

    try {
      const result = await axios.post(
        "http://localhost:4507/login",
        { email, password },
        { withCredentials: true }
      );

      if (result.data === "Login successful!") {
        login();
        console.log("Login successfully done");
        alert("Login Successfully Done");
        navigate("/home");
      } else if (result.data === "Wrong password") {
        setError("Incorrect password. Please try again.");
      } else if (result.data === "No records found!") {
        setError("No account found with this email address.");
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Left side - Login form */}
        <div className="login-form-section">
          <div className="brand-section">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <h3 className="brand-name">Eduverse</h3>
          </div>
          
          <div className="login-form-container">
            <h2 className="welcome-text">Welcome Back</h2>
            <p className="login-subtitle">Log in to your account</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                </div>
                <div className="input-container">
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
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
              </div>
              
              {error && (
                <div className="error-container">
                  <span className="error-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  </span>
                  <p className="error-message">{error}</p>
                </div>
              )}
              
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            
            <div className="register-section">
              <p>Don't have an account?</p>
              <Link to="/register" className="register-link">Create account</Link>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="login-image-section">
          <div className="image-overlay">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;