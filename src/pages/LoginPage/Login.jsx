import { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:4507/login', { email, password })
      .then(result => {
        // Check for success or failure response
        if (result.data === "Login successful!") {
          console.log("Login successfully done");
          alert("Login Successfully Done");
          navigate('/home');
        } else if (result.data === "Wrong password") {
          alert("Incorrect password. Please try again.");
        } else if (result.data === "No records found!") {
          alert("No account found with this email address.");
        } else {
          alert("Unexpected response from server.");
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred while logging in.");
      });
  };
  
  return (
    <div>
       <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="input">
             <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" id="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="input">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" id="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} required minLength={6}/>
            </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="container my-2">  Don&apos;t have an account?</p>
         <Link to="/register" className="register">Register</Link>
        
       </div>
       </div>
  )
}

export default Login

       