import React from 'react';
import { FaTrain, FaRegClock, FaShieldAlt, FaTicketAlt, FaUserFriends } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />

      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">About GoRail</h1>
        <p className="text-center text-lg mb-10 text-gray-300">
          GoRail is your modern solution for hassle-free train bookings across India. Inspired by IRCTC, we aim to deliver a smooth, fast, and reliable experience for all your travel needs.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Feature Card */}
          <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
            <FaTrain className="text-4xl text-yellow-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">Nationwide Train Access</h3>
            <p className="text-sm text-gray-300 text-center">Book trains across India with real-time availability and seamless experience.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
            <FaRegClock className="text-4xl text-pink-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">Instant Booking</h3>
            <p className="text-sm text-gray-300 text-center">Lightning-fast booking process with minimal steps. No waiting in long queues anymore.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
            <FaShieldAlt className="text-4xl text-green-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-300 text-center">Your transactions are safe with our Razorpay integration and encryption protocols.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
            <FaTicketAlt className="text-4xl text-blue-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">E-Tickets & History</h3>
            <p className="text-sm text-gray-300 text-center">Access your ticket history and download e-tickets anytime, anywhere.</p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300">
            <FaUserFriends className="text-4xl text-red-400 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-center mb-2">User Friendly UI</h3>
            <p className="text-sm text-gray-300 text-center">Modern and clean interface designed to be intuitive for every user, on any device.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
