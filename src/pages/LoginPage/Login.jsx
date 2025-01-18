
const Login = () => {
  return (
    <div>
       <div className="login">
        <h2>Login</h2>
        <form>
            <div className="input">
             <label>Email</label>
            <input type="email" id="email" placeholder='Enter your email'/>
            </div>
            <div className="input">
            <label>Password</label>
            <input type="password" id="password" placeholder='Enter your password'/>
            </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
       </div>
       </div>
  )
}

export default Login

       