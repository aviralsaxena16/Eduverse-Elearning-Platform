import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/context';
import './Logout.css';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('https://eduverse-backend-15ur.onrender.com/logout', {}, {
                withCredentials: true
            });
            
            if (response.status === 200) {
                logout();
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="logout-button"
        >
            Logout
        </button>
    );
};

export default Logout;