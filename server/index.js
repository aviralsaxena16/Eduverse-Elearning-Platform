import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


await mongoose.connect('mongodb://127.0.0.1:27017/eduverse')
.then(console.log("Connect"))
 .catch(err => console.log(err));

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
  
    // Find user by email
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          // Compare provided password with the hashed password
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                res.json("Login successful!");
              } else {
                res.json("Wrong password");
              }
            })
            .catch(err => {
              console.error("Error comparing passwords:", err);
              res.status(500).json("Internal server error");
            });
        } else {
          res.json("No records found!");
        }
      })
      .catch(err => {
        console.error("Error finding user:", err);
        res.status(500).json("Internal server error");
      });
  });
 
app.listen(4507,()=>{
    console.log("Server is running on http://127.0.0.1:4507");
});