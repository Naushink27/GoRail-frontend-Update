import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import Navbar from './Navbar';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const key = "rzp_test_hccYJSSRLsuGsj"

  const fetchData = async () => {
    if (!userId) {
      setError('Please log in to view bookings.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/allbookings/${userId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data && Array.isArray(res.data.data)) {
        setBookings(res.data.data);
      } else {
        setBookings([]);
        setError('No bookings found.');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);
  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded. Please refresh and try again.");
    return;
  }
  

  const handlePayment = async (bookingId) => {
    try {
      if (!window.Razorpay) {
        alert('Razorpay SDK not loaded. Please try again later.');
        return;
      }
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/train/orders/${bookingId}`,
        {},
        { withCredentials: true }
      );
      if (res.data && res.data.data && res.data.data[0]) {
        const { razorpayOrderId, amount, email, name } = res.data.data[0];

        const options = {
          key,
          amount: amount * 100,
          currency: 'INR',
          name: 'GoRail Booking',
          description: 'Train Ticket Payment',
          order_id: razorpayOrderId,
          handler: function (response) {
            alert('✅ Payment successful! Your booking will be confirmed soon.');
            setTimeout(() => {
              fetchData();
            }, 3000);
          },
          prefill: {
            name,
            email,
          },
          theme: {
            color: '#0d9488',
          },
        };
        console.log('Razorpay options:', options);
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      alert('Failed to initiate payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">All Your Bookings</h1>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.length === 0 && !loading && !error ? (
            <p className="text-center">No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#1e293b] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
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
       {booking.passengers.length>0&&         <div className="bg-gray-900 text-white px-4 py-6 rounded-lg shadow-md">
                  <h3 className="font-semibold mb-2">Booking Details:</h3>
  {booking.passengers.length > 0 && (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-300">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {booking.passengers.map((passenger, index) => (
            <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition-all rounded">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{passenger.firstName}</td>
              <td className="px-4 py-2">{passenger.lastName}</td>
              <td className="px-4 py-2">{passenger.age} years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>}

                <div className="mt-6 text-center">
                  {booking.paymentStatus.toLowerCase() === 'pending' && (
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
                      disabled={loading}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;