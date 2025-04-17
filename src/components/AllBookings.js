import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import Navbar from './Navbar';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/allbookings/${userId}`);
        console.log(res.data);  // Check if the data is being fetched correctly
        setBookings(res.data.data); // Assuming data is inside the "data" property
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };
    fetchData();
  }, [userId]);

  const handlePayment = (bookingId) => {
    // Handle payment logic
    console.log(`Initiating payment for booking ID: ${bookingId}`,{withCredentials:true});
    // Payment logic goes here.
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">All Your Bookings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (

              <div key={booking._id} className="bg-[#1e293b] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <h2 className="text-xl font-semibold mb-2">Train: {booking.trainName}</h2>
                <p className="text-gray-400 mb-4">Booking ID: {booking._id}</p>

                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Payment Status:</h3>
                    <p className={booking.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}>
                      {booking.paymentStatus}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Journey Status:</h3>
                    <p className={booking.journeyStatus === 'Completed' ? 'text-green-500' : 'text-yellow-500'}>
                      {booking.journeyStatus}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="font-semibold">From:</h3>
                    <p>{booking.from}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">To:</h3>
                    <p>{booking.to}</p>
                  </div>
                </div>

                {/* Conditionally render the button */}
                {booking.
paymentStatus === 'Pending' ? (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
                    >
                      Pay Now
                    </button>
                  </div>
                ) : (
                  <p className="text-green-500 mt-4">Payment Completed</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
