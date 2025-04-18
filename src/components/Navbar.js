import axios from 'axios';
import React, { useState } from 'react';
import { FaTrain } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { persistor } from '../utils/appStore';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log(user)
  
  const routes = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
  
      dispatch(removeUser());
      await persistor.purge(); 
  
      console.log("Logout successful");
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  const handleLogin=()=>{
    navigate('/login')
  }
  return (
    <nav className="bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Logo */}
        <div className="flex items-center text-xl font-semibold">
          <FaTrain className="text-[#f52c6c] mr-2" size={28} />
          <span>go<span className="text-[#f52c6c]">Rail</span></span>
        </div>

        {/* Middle: Links (Desktop) */}
        <div className="hidden md:flex gap-6 text-base font-medium">
      {routes.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="hover:text-[#f52c6c] transition duration-200 cursor-pointer"
        >
          {item.name}
        </Link>
      ))}
        { user &&<Link
          
          to='/allbookings'
          className="hover:text-[#f52c6c] transition duration-200 cursor-pointer"
        >
          All BOOKINGS
        </Link>}
      
    </div>

        {/* Right: Search + Avatar */}
      {user ? <div className="flex items-center gap-4">
         
        <button className="btn  bg-[#f52c6c] text-white" onClick={handleLogout}>Logout</button>
            
            
          </div>:        <button className="btn  bg-[#f52c6c] text-white" onClick={handleLogin}>Login</button>
        }

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <ul className="flex flex-col gap-3 text-base font-medium">
          {routes.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="hover:text-[#f52c6c] transition duration-200 cursor-pointer"
        >
          {item.name}
        </Link>
      ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
