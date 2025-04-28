import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from '../pages/Footer';
import { CalendarDaysIcon, MapPinIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainData = useSelector((store) => store.bookTrain);

  // State management
  const [seatType, setSeatType] = useState('');
  const [seatAvailable, setSeatAvailable] = useState(false);
  const [price, setPrice] = useState('');
  const [bookingAlert, setBookingAlert] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', age: '' }]);

  const seatTypes = ['General', 'AC', 'Sleeper', 'First Class'];

  // Validate trainData
  if (!trainData || !trainData._id) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-red-500">Error: Train data not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { _id: trainId, name, number, journeyDate, departureTime, arrivalTime, source, destination, seats, amount } = trainData;

  // Format dates and times
  const formattedJourneyDate = new Date(journeyDate).toLocaleDateString();
  const formattedDepartureTime = new Date(departureTime).toLocaleTimeString();
  const formattedArrivalTime = new Date(arrivalTime).toLocaleTimeString();

  const getSeatCount = (type) => {
    if (!seats || !Array.isArray(seats)) return 0;
    const seat = seats.find((seat) => seat.type === type);
    return seat ? seat.count : 0;
  };

  const handleSeatType = (type) => {
    setSeatType(type);
    const selectedSeat = seats?.find((seat) => seat.type === type);
    const selectedAmount = amount?.find((item) => item.type === type);
    setPrice(selectedAmount ? selectedAmount.amount : '');
    setSeatAvailable(selectedSeat && selectedSeat.count >= passengers.length);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '', age: '' }]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) {
      setError('At least one passenger is required.');
      return;
    }
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
    // Recheck seat availability
    if (seatType) {
      const selectedSeat = seats?.find((seat) => seat.type === seatType);
      setSeatAvailable(selectedSeat && selectedSeat.count >= updatedPassengers.length);
    }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!seatType) {
      setError('Please select a seat type.');
      return;
    }
    // Validate passengers
    for (const passenger of passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.age) {
        setError('All passenger fields are required.');
        return;
      }
      if (isNaN(passenger.age) || passenger.age < 1 || passenger.age > 120) {
        setError('Invalid age for passenger.');
        return;
      }
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        `${BASE_URL}/train/book/${trainId}`,
        {
          journeyDate,
          seatType,
          passengers,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setBookingAlert('Booking successful! Redirecting to your bookings...');
        setTimeout(() => {
          setBookingAlert(null);
          navigate('/allbookings');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />
      {bookingAlert && (
        <div
          role="alert"
          className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{bookingAlert}</span>
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="alert alert-error absolute top-4 right-4 z-50 bg-red-500 text-white p-4 rounded flex items-center gap-2 shadow-lg"
        >
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-2 text-white font-bold">
            ×
          </button>
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
                value={name || ''}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Train Number */}
            <div>
              <label className="block mb-1 text-sm font-medium">Train Number</label>
              <input
                readOnly
                value={number || ''}
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
                  value={source || ''}
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
                  value={destination || ''}
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
                  value={formattedJourneyDate}
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
                  const isAvailable = count >= passengers.length;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSeatType(type)}
                      className={`w-full px-4 py-2 rounded-md font-medium border 
                        ${seatType === type ? 'bg-indigo-600 text-white' : ''}
                        ${isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-600 cursor-not-allowed'}`}
                      disabled={!isAvailable}
                      title={isAvailable ? `${count} seats available` : `Insufficient seats for ${passengers.length} passengers`}
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
                value={formattedDepartureTime}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Arrival Time */}
            <div>
              <label className="block mb-1 text-sm font-medium">Arrival Time</label>
              <input
                readOnly
                value={formattedArrivalTime}
                className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-medium">Total Price ({passengers.length} passenger(s))</label>
              <div className="relative">
                <CurrencyRupeeIcon className="w-5 h-5 absolute left-3 top-3 text-gray-300" />
                <input
                  readOnly
                  value={price ? price * passengers.length : ''}
                  className="w-full pl-10 px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Passenger Details</h3>
            {passengers.map((passenger, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-md relative">
                <h4 className="text-md font-medium mb-2">Passenger {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">First Name</label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Last Name</label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Age</label>
                    <input
                      type="number"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter age"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>
                {passengers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePassenger(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPassenger}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Passenger
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !seatAvailable}
            className={`w-full mt-4 py-2 rounded-md font-semibold transition duration-300 
              ${loading || !seatAvailable ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Book;