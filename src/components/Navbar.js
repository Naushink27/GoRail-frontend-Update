import React, { useState } from 'react';
import { FaTrain } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          {['HOME', 'ABOUT', 'CONTACT', 'LOGIN'].map((item, index) => (
            <a
              key={index}
              className="hover:text-[#f52c6c] transition duration-200 cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: Search + Avatar */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-sm input-bordered w-28 md:w-44 text-black px-3 py-1 rounded-md"
          />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><a className="justify-between">Profile <span className="badge">New</span></a></li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>

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
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <ul className="flex flex-col gap-3 text-base font-medium">
            {['HOME', 'About', 'Contact', 'Services'].map((item, index) => (
              <li key={index}>
                <a className="hover:text-[#f52c6c] transition duration-200 cursor-pointer">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
