import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
const ProfilePic = () => {
  const [profilePic,setProfilePic]=useState('')

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
            No profile picture available
        </div>
    )}
</div>  )
}

export default ProfilePic