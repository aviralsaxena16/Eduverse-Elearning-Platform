
import { HiHome } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';


import "./Navbar2.css"

const Navbar2 = () => {
  return (
    <div>
     <nav>
        <ul className='Nav2'>
        <li><FaBars/></li>
        <li className="search-container">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
            />
          </li>
         
            <li className='home'><HiHome/></li>
            <li><FaUser/></li>
            
        </ul>
    </nav>
    </div>
  )
}

export default Navbar2
