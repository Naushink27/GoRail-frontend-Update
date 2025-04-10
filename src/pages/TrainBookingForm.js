import React from 'react';
import { FaTrain, FaExchangeAlt, FaMapMarkerAlt, FaCalendarAlt, FaHashtag, FaThList } from 'react-icons/fa';

const TrainBookingForm = () => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-pink-500 p-6 rounded-xl shadow-lg text-white space-y-5">

      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-4">
        <FaTrain className="text-pink-400" /> Book Your Train
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* From */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaMapMarkerAlt /> From</label>
          <input type="text" placeholder="Enter source" className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* To */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaMapMarkerAlt /> To</label>
          <input type="text" placeholder="Enter destination" className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaCalendarAlt /> Journey Date</label>
          <input type="date" className="p-2 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Train Number */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaHashtag /> Train Number</label>
          <input type="text" placeholder="Ex: 12345" className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Seat Type */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaThList /> Seat Type</label>
          <select className="p-2 rounded-md bg-white/20 text-black focus:ring-2 focus:ring-pink-400">
            <option>General</option>
            <option>Sleeper</option>
            <option>AC Chair</option>
            <option>First Class</option>
          </select>
        </div>

        
      </div>

      <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105">
        Search Train
      </button>
    </div>
  );
};

export default TrainBookingForm;
