import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const JWT= process.env.JWT_SECRET



const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  // console.log('Token received:', token); // Debug: log the token

  if (!token) {
    console.log('No token found'); // Debug: log when no token is present
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  jwt.verify(token,JWT, (err, decoded) => {
    if (err) {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    //   console.log('Token verification error:', err); // Debug: log verification errors
      return res.status(403).json({ message: 'Token is not valid' });
    }
    
    // console.log('Decoded token:', decoded); // Debug: log decoded token
    req.user = decoded;
    next();
  })};

export default verifyUser


