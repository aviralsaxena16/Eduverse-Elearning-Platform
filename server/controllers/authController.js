import dotenv from 'dotenv';
dotenv.config()
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;


export const register=async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json("Already registered");
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ 
        name, 
        email, 
        password: hashedPassword 
      });
      
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        error: "Registration failed", 
        details: error.message 
      });
    }
  };
  export const login =async(req, res) => {
      const { email, password } = req.body;
    
      User.findOne({ email: email })
        .then(user => {
          if (user) {
            bcrypt.compare(password, user.password)
              .then(isMatch => {
                if (isMatch) {
                  const token = jwt.sign(
                    { email: user.email, id: user._id }, // Make sure this matches what we check in profile
                    'ItAlright', 
                    { expiresIn: '1d' }
                  );
                  res.cookie('token', token, {
                    httpOnly: true,
                    secure: false, // Set to true in production with HTTPS
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                  });
                  res.json({
                    success: true,
                    message: "Login successful!"
                  });
                } else {
                  res.status(401).json({ success: false, message: "Wrong password" });
                }
              })
              .catch(err => {
                console.error("Error comparing passwords:", err);
                res.status(500).json({ success: false, message: "Internal server error" });
              });
          } else {
            res.status(404).json({ success: false, message: "No records found!" });
          }
        })
        .catch(err => {
          console.error("Error finding user:", err);
          res.status(500).json({ success: false, message: "Internal server error" });
        });
    };
  
    export const googleAuth= async (req, res) => {
      try {
          const { token } = req.body;      
          if (!token) {
              return res.status(400).json({ success: false, message: "Token is required" });
          }
          
          const ticket = await client.verifyIdToken({
              idToken: token,
              audience: GOOGLE_CLIENT_ID
          });
          
          const payload = ticket.getPayload();
          const { name, email, picture } = payload;
  
          let user = await User.findOne({ email });
  
          if (!user) {
            console.log(picture);
              user = new User({
                  name,
                  email,
                  googleId: payload.sub,
                  picture,
                  password: ""
              });
              await user.save();
          }
  
          // Use the same JWT_SECRET as other routes
          const authToken = jwt.sign(
              { id: user._id }, 
              JWT_SECRET,
              { expiresIn: '1h' }
          );
  
          res.cookie('token', authToken, { httpOnly: true, secure: false });
          res.json({
              success: true,
              token: authToken,
              user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  picture: user.picture
              }
          });
              
      } catch (error) {
          console.error("Google Auth Error:", error);
          res.status(400).json({ 
              success: false, 
              message: "Google login failed",
              error: error.message 
          });
      }
  };
  
  
  export const logout=async (req,res)=>{
    res.clearCookie('token');
    res.json('Logged out successfully!');
   };
  
  
