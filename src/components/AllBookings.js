import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import Navbar from './Navbar';


const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [ShowpaymentButton,setShowPaymentButton]=useState('')
  const user = useSelector((store) => store.user);
  const userId = user._id;
  const key='rzp_test_Ajos5K0E47aZxK';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/allbookings/${userId}`,{withCredentials:true});
        console.log(res.data);  // Check if the data is being fetched correctly

        setBookings(res.data.data); // Assuming data is inside the "data" property
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };
    fetchData();
  }, [userId]);

  const handlePayment = async(bookingId) => {
     try{
      console.log(bookingId)
      const res= await axios.post(BASE_URL+'/train/orders/'+bookingId,{},{withCredentials:true})
      console.log(res)
      const {
        razorpayOrderId,amount,email,name
      }=res.data.data[0];

      const options = {
        key: key, 
        amount: amount * 100,
        currency: "INR",
        name: "GoRail Booking",
        description: "Train Ticket Payment",
        order_id: razorpayOrderId,
        handler: function (res) {
          alert("✅ Payment successful! Your booking will be confirmed soon.");
          
          setTimeout(() => {
            window.location.reload(); 
          }, 3000);
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#0d9488",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
     }catch(err){

     }
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
                    <p>{booking.source}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">To:</h3>
                    <p>{booking.destination}</p>
                  </div>
                </div>

                {/* Conditionally render the button */}
                {booking.
paymentStatus === 'pending' ? (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
                    >
                      Pay Now
                    </button>
                  </div>
                ) : (
                  <button
                  onClick={() => handlePayment(booking._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
                >
                  Download recipt
                </button>
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
