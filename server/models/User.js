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
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);