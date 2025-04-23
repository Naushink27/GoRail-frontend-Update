import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrain, FaEdit, FaUsers, FaList, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logoutAdmin', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-full sm:w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg p-4 sm:p-6 fixed sm:static top-0 left-0 h-full z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-6 sm:mb-8 mt-12 sm:mt-0">
          <span className="text-base sm:text-lg font-semibold">Hello, Admin</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">GoRail Admin</h2>
        <nav className="flex flex-col gap-3 sm:gap-4">
          <Link
            to="/adminDashboard"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            <FaTrain /> Dashboard
          </Link>
          <Link
            to="/addTrain"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            <FaTrain /> Add Train
          </Link>
          <Link
            to="/updateTrain"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            <FaEdit /> Update Train
          </Link>
          <Link
            to="/allBookingsAdmin"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            <FaList /> View Bookings
          </Link>
          <Link
            to="/allUsers"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm sm:text-base"
            onClick={() => setIsOpen(false)}
          >
            <FaUsers /> View All Users
          </Link>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded text-sm sm:text-base text-left"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}