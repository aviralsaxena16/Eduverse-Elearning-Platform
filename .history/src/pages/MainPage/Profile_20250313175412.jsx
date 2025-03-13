
import { useState, useEffect } from "react";
import './Profile.css'

import ProfilePic from "../Profile/ProfilePic";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    dob: "",
    institute: "",
    githubLink: "",
    skills: [],
    about: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      fetch('http://localhost:4507/home/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log('Profile Response:', data);
        if (!data.success) {
          throw new Error(data.message);
        }
      setUserProfile({
        dob:data.user.dob,
        institute:data.user.institute,
        githubLink:data.user.githubLink,
        skills:data.user.skills,
        about:data.user.about,
      });
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        throw err;
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:4507/home/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userProfile),
      });
  
      // Log response to see if it contains an HTML error
      console.log("Raw response:", response);
  
      const data = await response.json();
      console.log("Parsed JSON:", data);
  
      if (response.ok) {
        setUserProfile(data.user);
        alert("Profile updated successfully!");
        setIsEditing(false);
        fetchProfile(); // Refresh profile after update
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <>
      <div className="profile-pic-container">
        <ProfilePic />
      </div>
    <div className="profile-page-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>

      <div className="profile-details">
        <button 
          className="edit-button" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        <div>
          <label>Date of Birth:</label>
          {isEditing ? (
            <input
              type="date"
              value={userProfile.dob}
              onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
            />
          ) : (
            <p>{userProfile.dob || "Not specified"}</p>
          )}

          <label>Institute:</label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.institute}
              onChange={(e) => setUserProfile({ ...userProfile, institute: e.target.value })}
            />
          ) : (
            <p>{userProfile.institute || "Not specified"}</p>
          )}

          <label>GitHub:</label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.githubLink}
              onChange={(e) => setUserProfile({ ...userProfile, githubLink: e.target.value })}
            />
          ) : userProfile.githubLink ? (
              <a href={userProfile.githubLink} target="_blank" rel="noopener noreferrer">
                {userProfile.githubLink}
              </a>
            ) : (
              <p>Not specified</p>
            )}
            
            
           /* <p><a href={userProfile.githubLink || "#"} target="_blank" rel="noopener noreferrer">
            {userProfile.githubLink || "Not specified"}
         </a>
         </p>
            <p>{userProfile.githubLink || "Not specified"}</p>
          

          <label>Skills:</label>
          {isEditing ? (
            <input
              type="text"
              value={userProfile.skills.join(", ")}
              onChange={(e) => setUserProfile({ ...userProfile, skills: e.target.value.split(",") })}
            />
          ) : (
            <p>{userProfile.skills.length > 0 ? userProfile.skills.join(", ") : "No skills specified"}</p>
          )}

          <label>About:</label>
          {isEditing ? (
            <textarea
              value={userProfile.about || ""}
              onChange={(e) => setUserProfile({ ...userProfile, about: e.target.value })}
            />
          ) : (
            <p>{userProfile.about || "No description"}</p>
          )}
        </div>

        {isEditing && (
          <button 
            className="save-button" 
            onClick={handleSave}
          >
            Save Profile
          </button>
        )}
      </div>
    </div>
    </>
  );};

export default Profile;