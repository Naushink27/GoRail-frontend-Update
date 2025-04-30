import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from '../pages/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBookTrain } from '../utils/bookTrainSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addTrain } from '../utils/getTrainSlice';

const Trains = () => {
  const trains = useSelector((store) => store.train);
  const user = useSelector((store) => store.user);
  const [activeAlertIndex, setActiveAlertIndex] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch trains from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + '/train',{withCredentials: true});
        dispatch(addTrain(res.data)); // Assuming your backend provides the list of trains here
      } catch (err) {
      }
    };
    fetchData();
  }, [dispatch]);

  const handleBook = (index) => {
    if (user) {
      dispatch(addBookTrain(trains[index]));
      navigate('/book');
    } else {
      setActiveAlertIndex(index);
    }
  };

  const handleLoginPage = (data) => {
    if (data === "Accept") {
      navigate('/login');
    } else {
      navigate('/trains');
    }
  };

  const checkSeatAvailability = (seats) => {
    return seats.reduce((total, seat) => total + seat.count, 0) === 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />

      <div className="flex-grow flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Available Trains</h2>

          {trains.length > 0 ? (
            <div className="grid gap-6">
              {trains.map((train, index) => {
                const journeyDate = new Date(train.journeyDate).toLocaleDateString();
                const departureTime = new Date(train.departureTime).toLocaleTimeString();
                const arrivalTime = new Date(train.arrivalTime).toLocaleTimeString();
                const isNoSeatsAvailable = checkSeatAvailability(train.seats);

                return (
                  <div key={index} className="bg-[#203647] rounded-2xl shadow-lg p-5 transition hover:shadow-xl hover:scale-[1.01]">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-3">
                      <div>
                        <h3 className="text-lg font-bold">{train.name}</h3>
                        <p className="text-sm text-gray-300">#{train.number}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-medium text-sm">{train.source} → {train.destination}</p>
                        {isNoSeatsAvailable ? (
                          <p className="text-xs text-red-500">Status: No seats available</p>
                        ) : (
                          <p className="text-xs text-green-400">Status: {train.trainStatus}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div><span className="font-semibold">Journey Date:</span> {journeyDate}</div>
                      <div><span className="font-semibold">Arrival:</span> {arrivalTime}</div>
                      <div><span className="font-semibold">Departure:</span> {departureTime}</div>
                    </div>

                    <div className="pt-4">
                      {!isNoSeatsAvailable && (
                        <button className="btn btn-accent text-white font-serif" onClick={() => handleBook(index)}>Book</button>
                      )}
                      {activeAlertIndex === index && !user && (
                        <div role="alert" className="alert alert-vertical sm:alert-horizontal pt-3">
                          <span>Please Login first to Book a ticket!! Want to redirect to login page?</span>
                          <div>
                            <button className="btn btn-sm" onClick={() => handleLoginPage('Deny')}>Deny</button>
                            <button className="btn btn-sm btn-primary" onClick={() => handleLoginPage('Accept')}>Accept</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center flex align-center justify-center flex-col gap-2">
              <h3 className="text-lg font-semibold text-red-500">No trains available for the selected criteria.</h3>
              <p className="text-sm text-gray-300">Please try different search criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Trains;
