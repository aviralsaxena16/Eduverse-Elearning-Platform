import { Link } from 'react-router-dom';
import Logout from '../../pages/LoginPage/Logout.jsx';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={isOpen ? 'sidebar' : 'sidebar close'}>
      <div className="close_btn" onClick={toggleSidebar}>
        &times;
      </div>
      <ul className="options">
        <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
        <li><Link to="/home/course" onClick={toggleSidebar}>Videos</Link></li>
        <li><Link to="/home/chat" onClick={toggleSidebar}>Discuss</Link></li>
        <li><Link to="/home/quiz" onClick={toggleSidebar}>Quiz</Link></li>
        <li><Link to="/home/games" onClick={toggleSidebar}>Games</Link></li>
        <li><Link to="/home/notification" onClick={toggleSidebar}>Notification</Link></li>
        <Logout/>
      </ul>
    </div>
  );
};

export default Sidebar;