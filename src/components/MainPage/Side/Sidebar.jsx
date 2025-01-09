import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={isOpen ? 'sidebar' : 'sidebar close'}>
      <div className="close_btn" onClick={toggleSidebar}>
        &times;
      </div>
      <ul className="options">
        <li><Link to="/home" onClick={toggleSidebar}>Home</Link></li>
        <li><Link to="/course" onClick={toggleSidebar}>Course</Link></li>
        <li><Link to="/bot" onClick={toggleSidebar}>Bot</Link></li>
        <li><Link to="/quiz" onClick={toggleSidebar}>Quiz</Link></li>
        <li><Link to="/games" onClick={toggleSidebar}>Games</Link></li>
        <li><Link to="/notification" onClick={toggleSidebar}>Notification</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;