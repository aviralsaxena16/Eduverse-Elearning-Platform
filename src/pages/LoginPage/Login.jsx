import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../context/context.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login}=useAuth();

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
    <div className="login-container">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="container my-2">Don&apos;t have an account?</p>
        <Link to="/register" className="register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
