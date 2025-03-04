import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

// Constants
const GOOGLE_CLIENT_ID = "1048064892245-ru5mnl225peivhp9emsvhlj6qum1oo0m.apps.googleusercontent.com";
const JWT_SECRET = "Its Alright";

const app = express();
app.use(express.json());
// app.use((req, res, next) => {
//   console.log('Cookies:', req.cookies);
//   console.log('Token:', req.cookies.token);
//   next();
// });

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));
app.use(cookieParser());


await mongoose.connect('mongodb+srv://Aviral:aviral1947%40@eduversecluster.i3xl8.mongodb.net?retryWrites=true&w=majority&appName=EduverseCluster')
.then(() => console.log("Connected to database"))
.catch(err => console.log(err));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Token received:', token); // Debug: log the token

  if (!token) {
    console.log('No token found'); // Debug: log when no token is present
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err); // Debug: log verification errors
      return res.status(403).json({ message: 'Token is not valid' });
    }
    
    console.log('Decoded token:', decoded); // Debug: log decoded token
    req.user = decoded;
    next();
  })};






app.get('/home',verifyUser,(req,res)=>{
  return res.send('Success')
})

 app.post('/register', (req, res) => {
  const { name,email, password } = req.body;
  
  // Check if the user already exists
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Already registered");
      } 
      
      else {
        bcrypt.hash(password,10)
         .then(hashedPassword => {
        User.create({ name:name,email: email, password: hashedPassword})
         .then(newUser => res.json(newUser))
         .catch(err => console.log(err));

 }) }})
    .catch(err => console.log(err));
  })


  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                const token = jwt.sign(
                  { email: user.email, id: user._id }, // Make sure this matches what we check in profile
                  'Its Alright', 
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
  });

  app.post('/auth/google/callback', async (req, res) => {
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
});


app.post('/logout',(req,res)=>{
  res.clearCookie('token');
  res.json('Logged out successfully!');
 });

 
 app.put('/home/profile', verifyUser, async (req, res) => {
  try {

    // Ensure we have a valid user ID
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID not found in token" });
    }

    const updates = {};
    const allowedFields = ["dob", "institute", "githubLink", "skills", "about"];

    // Loop through the request body and only add valid fields to updates
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // Use req.user.id directly
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ 
      message: "Internal server error",
      errorDetails: error.message 
    });
  }
});// Updated GET route for profile
app.get('/home/profile', verifyUser, async (req, res) => {
  try {
    
    console.log('User from token:', req.user);
    
    
    const user = await User.findById(req.user.id || req.user._id)
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Returning User Data:", user);
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




function bestmove(board){
    const available = board.map((cell,i)=>cell===''?i:null).filter((cell)=>cell!==null)
    if(available.length===0) return null
    let n=available.length
    return available[Math.floor(Math.random()*n)]
}

app.post('/move', (req, res) => {
  const { board } = req.body;
  const aiMove = bestmove(board);
  res.json({ move: aiMove });
});



app.listen(4507,()=>{
    console.log("Server is running on http://127.0.0.1:4507");
});