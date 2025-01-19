import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/eduverse');

app.post('/register',(req,res)=>{
    const {name, email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            User.create(req.body)
            .then(user_data => res.json(user_data))
            .catch(err => res.json(err))
        }
    })
})
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Login Successful!")
            }
            else{
                res.json("Incorrect Password!");
            }
        }
        else{
            res.json("User not found!");
        }
    })
})

app.listen(3001,()=>{
    console.log("Server is running on http://127.0.0.1:3001");
});