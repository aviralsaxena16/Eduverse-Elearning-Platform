import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
app.use(express.json());
app.use(cors());

await mongoose.connect('mongodb://127.0.0.1:27017/eduverse')
.then(console.log("Connect"))
 .catch(err => console.log(err));

app.post('/register',(req,res)=>{
    const {name, email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            const newUser = new User({name,email,password})
            newUser.save()
            res.json("User registered successfully!");

            }
    })
})
app.post('/login',(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(e => {
        if(e){
            if(e.password === password){
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
    .catch(err=>{console.log(err)});
});

app.listen(3002,()=>{
    console.log("Server is running on http://127.0.0.1:3002");
});