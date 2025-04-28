import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import emailjs from '@emailjs/browser';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return 'Valid email is required';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const error = validateForm();
    if (error) {
      setStatus(error);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(BASE_URL + '/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setStatus(response.data.success);
        setFormData({ name: '', email: '', message: '' });
        window.location.reload();
      } else {
        setStatus(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('Failed to send message. Try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
        <Navbar />
        <main className="flex-1 px-6 py-10 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-center text-lg text-gray-300 mb-10">
            Got questions, feedback, or issues? We're here to help!
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="bg-white/10 p-8 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-3xl text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-xl">Our Office</h3>
                  <p className="text-gray-300">123 Railway Avenue, Mumbai, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-3xl text-green-400" />
                <div>
                  <h3 className="font-semibold text-xl">Call Us</h3>
                  <p className="text-gray-300">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-3xl text-blue-400" />
                <div>
                  <h3 className="font-semibold text-xl">Email</h3>
                  <p className="text-gray-300">goRail7866@gmail.com</p>
                </div>
              </div>
            </div>
  
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-2xl shadow-xl space-y-6">
            <div>
                
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                  placeholder="Write your message here..."
                />
              </div>
              {status && (
                <p
                  className={`text-sm ${
                    status.includes('success') ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {status}
                </p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  
};

export default Contact;