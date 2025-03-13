import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import pic from '../../assets/user.png'
const ProfilePic = () => {
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
        <div
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          ) : (
            <div>
              <img src={pic} alt="Placeholder" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
          )}
    
          {/* Overlay with buttons */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              width: '100%',
              background: 'rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
              padding: '8px 0',
              opacity: '0',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
          >
            <label
              htmlFor="profile-pic-input"
              style={{
                color: 'white',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'block',
              }}
            >
              Change
            </label>
            <input type="file" id="profile-pic-input" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            {selectedFile && (
              <button
                onClick={handleUpload}
                style={{
                  backgroundColor: '#f0c419',
                  color: 'black',
                  border: 'none',
                  padding: '5px 8px',
                  borderRadius: '5px',
                  marginTop: '5px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
            )}
          </div>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      );
}

export default ProfilePic