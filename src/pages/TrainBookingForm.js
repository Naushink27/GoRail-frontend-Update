import axios from 'axios';
import React from 'react';
import { FaTrain, FaExchangeAlt, FaMapMarkerAlt, FaCalendarAlt, FaHashtag, FaThList } from 'react-icons/fa';
import { useState } from 'react';
import {BASE_URL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrain } from '../utils/getTrainSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
const TrainBookingForm = () => {
  const [source,setSource]=useState('')
  const [destination,setDestination]=useState('')
  const [date,setDate]=useState('')
  const [trainNumber,setTrainNumber]=useState('')
  const [seatType,setSeatType]=useState('')
  const [error,setError]=useState('')
  const Navigate=useNavigate()
  const dispatch=useDispatch()
  const handleGetTrains=async()=>{
   try{ const res= await axios.post(BASE_URL+'/train',{
      source,
      destination,
      journeyDate:date, 
      number:trainNumber,
      seatType
    },{withCredentials:true})
    console.log(res.data)
    dispatch(addTrain(res.data.train))
    Navigate('/trains')
  }
    catch(err){
      const errorMessage=err?.response?.data?.message
      console.log(errorMessage)
      setError(errorMessage)

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000, 
        pauseOnHover: true,
        theme: "dark"
      });


    }
    
  }
  

  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-pink-500 p-6 rounded-xl shadow-lg text-white space-y-5">

      <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-4">
        <FaTrain className="text-pink-400" /> Book Your Train
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* From */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaMapMarkerAlt /> From</label>
          <input onChange={(e)=>setSource(e.target.value)} value={source} type="text" placeholder="Enter source" className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* To */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaMapMarkerAlt /> To</label>
          <input onChange={(e)=>setDestination(e.target.value)} value={destination} type="text" placeholder="Enter destination" className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaCalendarAlt /> Journey Date</label>
          <input onChange={(e)=>setDate(e.target.value)} value={date} type="date" className="p-2 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Train Number */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaHashtag /> Train Number</label>
          <input onChange={(e)=>setTrainNumber(e.target.value)} value={trainNumber} type="text" placeholder="Ex: 12345" className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400" />
        </div>

        {/* Seat Type */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2"><FaThList /> Seat Type</label>
          <select onChange={(e)=>setSeatType(e.target.value)} value={seatType} className="p-2 rounded-md bg-white/20 text-black focus:ring-2 focus:ring-pink-400">
            <option>General</option>
            <option>Sleeper</option>
            <option>AC</option>
            <option>First Class</option>
          </select>
        </div>

        
      </div>

      <button onClick={handleGetTrains} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105">
        Search Train
      </button>
      <ToastContainer />

    </div>
  );
};

export default TrainBookingForm;
