
import { useState, useEffect } from "react";


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
      const response = await fetch("http://localhost:4507/home/profile", {
        method: "GET",
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("Fetched Profile Data:", data);
      if (response.ok && data.user) {
        setUserProfile(data.user);
      } else {
        console.error("Error fetching profile:", data.message || "Unknown error");
      }
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
    <div className="profile-container">
      <h2>User Profile</h2>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "EDIT"}
      </button>

      <div className="profile-details">
        <label>Date of Birth:</label>
        {isEditing ? (
          <input
            type="date"
            value={userProfile.dob}
            onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
          />
        ) : (
          <p>{userProfile.dob || "null"}</p>
        )}

        <label>Institute:</label>
        {isEditing ? (
          <input
            type="text"
            value={userProfile.institute}
            onChange={(e) => setUserProfile({ ...userProfile, institute: e.target.value })}
          />
        ) : (
          <p>{userProfile.institute || "null"}</p>
        )}

        <label>GitHub:</label>
        {isEditing ? (
          <input
            type="text"
            value={userProfile.githubLink}
            onChange={(e) => setUserProfile({ ...userProfile, githubLink: e.target.value })}
          />
        ) : (
          <p>{userProfile.githubLink || "null"}</p>
        )}

        <label>Skills:</label>
        {isEditing ? (
          <input
            type="text"
            value={userProfile.skills.join(", ")}
            onChange={(e) => setUserProfile({ ...userProfile, skills: e.target.value.split(",") })}
          />
        ) : (
          <p>{userProfile.skills.length >0 ? userProfile.skills.join(", ") : "null"}</p>
        )}

        <label>About:</label>
        {isEditing ? (
          <textarea
            value={userProfile.about || ""}
            onChange={(e) => setUserProfile({ ...userProfile, about: e.target.value })}
          />
        ) : (
          <p>{userProfile.about || "null"}</p>
        )}
      </div>

      {isEditing && <button onClick={handleSave}>Save</button>}
    </div>
  );
};

export default Profile;
