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
    axios.post('http://localhost:3002/login', {email,password})
    .then(result=>{
      console.log(result);
      if(result.data === "Login Successful!"){
        console.log("login successfully done");
        alert("Login Successfully Done");
        navigate('/home');
      }
      else{
        alert("Incorrect Password!");
      }
    })
    .catch(err=> console.log(err));
  }
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

       