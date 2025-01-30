import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../context/context.jsx'
import axios from 'axios'

const Logout = () => {
    const navigate = useNavigate();
    const {logout}=useAuth()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4507/logout', {}, { withCredentials: true });
            logout();
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <style>
                {`
                    .logout-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }

                    .logout-btn {
                        background-color: #ff4d4d;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        font-size: 16px;
                        font-weight: bold;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    .logout-btn:hover {
                        background-color: #cc0000;
                    }
                `}
            </style>
            <div className="logout-container">
                
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
            
            </div>
        </>
    )
}

export default Logout;
