import React from "react";
import { Link } from "react-router-dom";
import { FaTrain, FaEdit, FaUsers, FaList } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-full lg:w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-lg p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src="https://via.placeholder.com/40" alt="Admin" className="w-10 h-10 rounded-full" />
        <span className="text-lg font-semibold">Hello, Admin</span>
      </div>
      <h2 className="text-2xl font-bold mb-6">GoRail Admin</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/add-train" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaTrain /> Add Train
        </Link>
        <Link to="/update-train" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaEdit /> Update Train
        </Link>
        <Link to="/allBookingsAdmin" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaList /> View Bookings
        </Link>
        <Link to="/allUsers" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          <FaUsers /> View All Users
        </Link>
      </nav>
    </div>
  );
}