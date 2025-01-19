import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post( 'http://localhost:3002/register', {name, email, password})
        .then(result=>{
            console.log(result);
            if(result.data === "already registered"){
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            }
            else{
                alert("Registration succefully done! Please Login to proceed");
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="input">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" id="name" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="input">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" id="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="input">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} required minLength={6}/>
            </div>
            <button type="submit>" className="btn">Sign Up</button>
           </form>
           <div className="link-container">
            <p className="link">Already have an account? <Link to="/login">Login</Link></p>
           </div>
        
    </div>
  )
}

export default Signup