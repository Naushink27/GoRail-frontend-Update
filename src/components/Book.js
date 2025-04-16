import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from '../pages/Footer';
import { CalendarDaysIcon, MapPinIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addBookTrain } from '../utils/bookTrainSlice';
import { useNavigate } from 'react-router-dom';



const Book = () => {
    const dispatch=useDispatch()
    const trainData=useSelector((store)=>store.bookTrain)
    const trainId=trainData._id;
    console.log(trainData)
    console.log(trainData)
    const trainNumber=trainData.number;
    const journeyDate = new Date(trainData.journeyDate).toLocaleDateString();
    const departureTime = new Date(trainData.departureTime).toLocaleTimeString();
    const arrivalTime = new Date(trainData.arrivalTime).toLocaleTimeString();
    const[seatType,setSeatType]=useState();
    const[seatAvailable,setSeatAvailable]=useState(false);
    const[price,setPrice]=useState();
    const seatTypes = ['General', 'AC', 'Sleeper', 'First Class'];
    const[bookingAlert,setBookingAlert]=useState(false)
    const navigate=useNavigate();
    

const handleBook=async(e)=>{
try{
  e.preventDefault();
  const res= await axios.post(BASE_URL+"/train/book/"+trainId,{
    journeyDate:trainData.journeyDate,
    seatType,

  },{withCredentials:true})
  console.log(res.status)

  if(res.status===200){
    console.log("Booking succesful")
    setBookingAlert(true)
    setTimeout(async()=>
    {
      setBookingAlert(false)
      navigate('/allbookings')
 
    },2000)
  }
}catch(err){

}
}


const getSeatCount = (type) => {
  if (!trainData || !trainData.seats) return 0;
  const seat = trainData.seats.find(seat => seat.type === type);
  return seat ? seat.count : 0;
};

    const handleSeatType=(e)=>{
        const seatType= e.target.value;
        setSeatType(seatType)
        const selected= trainData.amount.find(item=>item.type===seatType)
        setPrice(selected?selected.amount:'')
        if(selected && selected.count>0){
            setSeatAvailable(true)
        }
        else{
          setSeatAvailable(false)
        }
    }
  return (

    <div className='min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white'>
      <Navbar />
      {bookingAlert&& (
        <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Booking successful ! Redirecting to your all bookings</span>
        </div>
      )}
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleBook} className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-4">Book Your Journey</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Train Name */}
              <div>
              <label className="block mb-1 text-sm font-medium">Train Name</label>
              <input
                readOnly
                value={trainData.name}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Train Number */}
            <div>
              <label className="block mb-1 text-sm font-medium">Train Number</label>
              <input
                readOnly
                value={trainData.number}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {/* Source */}
            <div>
              <label className="block mb-1 text-sm font-medium">Source</label>
              <div className="relative">
                <MapPinIcon className="w-5 h-5 absolute left-3 top-3 text-gray-300" />
                <input
                readOnly
                  value={trainData.source}
                  className="w-full pl-10 px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block mb-1 text-sm font-medium">Destination</label>
              <div className="relative">
                <MapPinIcon className="w-5 h-5 absolute left-3 top-3 text-gray-300" />
                <input
                readOnly
                  type="text"
                  value={trainData.destination}
                  className="w-full pl-10 px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Journey Date */}
            <div>
              <label className="block mb-1 text-sm font-medium">Journey Date</label>
              <div className="relative">
                <CalendarDaysIcon className="w-5 h-5 absolute left-3 top-3 text-gray-300" />
                <input
                readOnly
                 
                  value={journeyDate}
                  className="w-full pl-10 px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Seat Type */}
            <div>
  <label className="block mb-1 text-sm font-medium">Seat Type</label>
  <div className="grid grid-cols-2 gap-2">
    {seatTypes.map((type) => {
      const count = getSeatCount(type);
      const isAvailable = count > 0;
      return (
        <button
          key={type}
          type="button"
          onClick={() => handleSeatType({ target: { value: type } })}
          className={`w-full px-4 py-2 rounded-md font-medium border 
                      ${isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-red-100 text-red-600 cursor-not-allowed'}`}
          disabled={!isAvailable}
          title={isAvailable ? `${count} seats available` : 'Unavailable'}
        >
          {type}
        </button>
      );
    })}
  </div>
</div>


            {/* Departure Time */}
            <div>
              <label className="block mb-1 text-sm font-medium">Departure Time</label>
              <input
               readOnly
               value={departureTime}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Arrival Time */}
            <div>
              <label className="block mb-1 text-sm font-medium">Arrival Time</label>
              <input
                readOnly
                value={arrivalTime}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          

            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-medium">Price</label>
              <div className="relative">
                <CurrencyRupeeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-300" />
                <input
                  type="number"
                  value={price}
                  className="w-full pl-10 px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-2 rounded-md"
          >
            Book Now
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Book;
