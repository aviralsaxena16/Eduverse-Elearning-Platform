import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    picture: {  // Add this field to store the profile picture
        type: String,
        default: ''
    },
   
    dob: {  
        type: Date,
        default: null
    },
    institute: {  
        type: String,
        default: null
    },
    githubLink: {  
        type: String,
        default: null
    },
    skills: {  
        type: [String],
        default: []
    },
    about: {  
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);