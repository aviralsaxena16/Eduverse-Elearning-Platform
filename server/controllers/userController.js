import User from '../models/User.js'
import cloudinary from '../config/cloudinary.js'


export const updateProfile=async(req,res)=>{
    try {
    
        // Ensure we have a valid user ID
        if (!req.user || !req.user.id) {
          console.log(req)
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
}

export const getProfile=async(req,res)=>{
    try {
    
        // console.log('User from token:', req.user);
        // console.log(req)
        
        const user = await User.findById(req.user.id || req.user._id)
          .select('-password');
        
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        // console.log("Returning User Data:", user);
        res.json({ success: true, user });
      } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}


export const getProfilePic=async(req,res)=>{
    try {
        if (!req.user || (!req.user.id && !req.user._id)) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
  
        const user = await User.findById(req.user.id || req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // console.log("Returning User ka  Data:", user);
        const profilePic = user.picture
        res.json({ success: true, profilePic });
    }
    catch (error) {
        console.error("Error retrieving profile picture:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const uploadProfilePic=async(req,res)=>{
    if (!req.user || !req.user.id) {
        console.log(req)
        return res.status(401).json({ message: "User ID not found in token" });
      }
      try {
        console.log(req.file.path)
        const userId = req.user.id; // Assuming user is authenticated
        const newProfilePic = req.file.path; // Cloudinary returns the URL in req.file.path // File path for the new image
    
        // Update user profile picture in the database
        const updatedUser=await User.findByIdAndUpdate(userId, { picture: newProfilePic },{new:true});
    
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        // Send back the new profile picture path
        res.json({ message: "Profile picture updated", profilePic: newProfilePic });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ error: "Failed to upload profile picture" });
      }
}