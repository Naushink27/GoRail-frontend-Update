import React from "react";
import { Link } from "react-router-dom";
import { FaTrain, FaEdit, FaUsers, FaList } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout=async()=>{
        const res=await axios.post(BASE_URL+'/logoutAdmin',{},{withCredentials:true})
        dispatch(removeUser())
        navigate('/')

  }
  return (
    <div className="w-full lg:w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src="https://via.placeholder.com/40" alt="Admin" className="w-10 h-10 rounded-full" />
        <span className="text-lg font-semibold">Hello, Admin</span>
      </div>
      <h2 className="text-2xl font-bold mb-6">GoRail Admin</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/addTrain" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaTrain /> Add Train
        </Link>
        <Link to="/updateTrain" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaEdit /> Update Train
        </Link>
        <Link to="/allBookingsAdmin" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaList /> View Bookings
        </Link>
        <Link to="/allUsers" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaUsers /> View All Users
        </Link>
        <button className="btn btn-error" onClick={(e)=>handleLogout()}>Logout</button>
      </nav>
    </div>
  );
}