import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import pic from '../../assets/user.png'
import './Profile.css'
const ProfilePic = ({isEditing}) => {
  const [profilePic,setProfilePic]=useState('')
  const [selectedFile,setSelectedfile]=useState('')
  const [error,setError]=useState('')

  useEffect(() => {
    const fetchProfilePic = async () => {
        try {
            const response = await axios.get('http://localhost:4507/home/profilePic', {
                withCredentials: true
            });
            
            if (response.data.success) {
                setProfilePic(response.data.profilePic);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile picture');
            console.error('Error fetching profile picture:', err);
        }
    };

    fetchProfilePic();
}, []);


    const handleFileChange=(e)=>{
        setSelectedfile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!selectedFile) {
          alert('Please select a file first!');
          return;
        }
    
        const formData = new FormData();
        formData.append('profilePic', selectedFile);
    
        try {
          const response = await axios.post('http://localhost:4507/home/upload-profile', formData, {
            withCredentials: true, // Ensures cookies are sent for authentication
            headers: { 'Content-Type': 'multipart/form-data' },
          });
    
          if (response.data.profilePic) {
            setProfilePic(response.data.profilePic);
            setSelectedfile(null)
            alert('Profile picture updated successfully!');
          }
        } catch (err) {
          setError('Failed to upload profile picture');
          console.error('Upload error:', err);
        }
      };
    
    


  return (
    <div className="profile-pic-container">
       {profilePic ? (
        <img 
            src={profilePic}
            alt="Profile"
            className="profile-pic"
            style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover'
            }}
        />
         ) : (
        <div className="profile-pic-placeholder">
            <img src={pic} style={{height:'150px',borderRadius:'50%'}}/>
        </div>
      )}
      {/* Show upload option only when editing */}
      {isEditing && (
        <div className="profile-pic-overlay">
          <label htmlFor="profile-pic-input" className="change-pic-btn">Change</label>
          <input 
            type="file" 
            id="profile-pic-input" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          {selectedFile && <button onClick={handleUpload} className="upload-btn">Save</button>}
        </div>
      )}

   {/* <div className="profile-pic-overlay">
        <label htmlFor="profile-pic-input" className="change-pic-btn">Change</label>
        <input type="file" id="profile-pic-input" accept="image/*" onChange={handleFileChange} />
        {selectedFile && <button onClick={handleUpload} className="upload-btn">Save</button>}
      </div>*/}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>  
)
}

export default ProfilePic