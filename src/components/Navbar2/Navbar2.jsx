import { useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import Sidebar from '../Side/Sidebar';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar2.css';

const Navbar2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div>
      <nav>
        <ul className="Nav2">
          <li onClick={toggleSidebar} aria-label="Toggle Sidebar" className='bars'>
            <FaBars />
          </li>
          {/* <li className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
            />
          </li> */}
          <li className='home'><HiHome /></li>
          <li className='profile'>
            <Link to="/home/profile">
            <FaUser />
            </Link>
          </li>
        </ul>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar2;