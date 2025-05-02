import React, { useState, useEffect, useCallback } from 'react';
import { FaTrain, FaMapMarkerAlt, FaCalendarAlt, FaHashtag, FaThList } from 'react-icons/fa';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrain } from '../utils/getTrainSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Debounce function to limit search frequency
const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);
  return useCallback((...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => callback(...args), delay);
    setTimeoutId(id);
  }, [timeoutId, delay]);
};

const TrainBookingForm = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [seatType, setSeatType] = useState('');
  const [error, setError] = useState('');
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [indianCities, setIndianCities] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch Indian cities from your backend using axios
  useEffect(() => {
    const fetchIndianCities = async () => {
      try {
        const url = `${BASE_URL}/api/cities`; // Ensure proper URL construction
        console.log('Fetching cities from:', url); // Log for debugging
        const response = await axios.get(url);
        console.log('Fetched cities:', response.data); // Log the response data
        setIndianCities(response.data);
      } catch (error) {
        console.error('Error fetching Indian cities:', error);
        toast.error('Failed to load city list from backend. Please ensure the backend is running and the endpoint is correct.', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
        });
      }
    };

    fetchIndianCities();
  }, []);

  // Filter city suggestions from the fetched list
  const fetchCitySuggestions = (query, setSuggestions) => {
    if (!query || query.length < 1) return setSuggestions([]);
    try {
      const filtered = indianCities.filter(city =>
        city.City.toLowerCase().startsWith(query.toLowerCase())
      );
      const uniqueCities = [...new Map(filtered.map(item => [item.City, item])).values()].slice(0, 10);
      setSuggestions(uniqueCities);
    } catch (error) {
      console.error('Error filtering city suggestions:', error);
      setSuggestions([]);
      toast.error('Failed to load city suggestions', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  const debouncedFetchSource = useDebounce((query) => fetchCitySuggestions(query, setSourceSuggestions), 300);
  const debouncedFetchDestination = useDebounce((query) => fetchCitySuggestions(query, setDestinationSuggestions), 300);

  const handleGetTrains = async () => {
    if (!source || !destination || !date) {
      const errorMessage = 'Please fill in all required fields';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
      return;
    }

    try {
      const url = `${BASE_URL}/train`;
      console.log('Submitting train search to:', url); // Log for debugging
      const response = await axios.post(url, {
        source,
        destination,
        journeyDate: date,
        number: trainNumber,
        seatType,
      }, {
        withCredentials: true, // Equivalent to credentials: 'include' in fetch
      });

      console.log('Train search response:', response.data); // Log the response data
      dispatch(addTrain(response.data.train));
      navigate('/trains');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-pink-500 p-4 sm:p-6 rounded-xl shadow-lg text-white space-y-6 font-sans">
      <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2 mb-4">
        <FaTrain className="text-pink-400" /> Book Your Train
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Source */}
        <div className="flex flex-col relative">
          <label className="text-sm mb-1 flex items-center gap-2" htmlFor="source">
            <FaMapMarkerAlt /> From
          </label>
          <input
            id="source"
            onChange={(e) => {
              const val = e.target.value;
              setSource(val);
              debouncedFetchSource(val);
            }}
            value={source}
            type="text"
            placeholder="Enter source city"
            className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            aria-autocomplete="list"
            aria-controls="source-suggestions"
          />
          {sourceSuggestions.length > 0 && (
            <ul
              id="source-suggestions"
              className="absolute top-full mt-1 z-10 bg-white text-black rounded-md shadow-lg max-h-40 overflow-y-auto w-full"
              role="listbox"
            >
              {sourceSuggestions.map((city, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-pink-100 cursor-pointer transition-colors"
                  onClick={() => {
                    setSource(city.City);
                    setSourceSuggestions([]);
                  }}
                  role="option"
                  aria-selected={false}
                >
                  {city.City}, {city.State}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination */}
        <div className="flex flex-col relative">
          <label className="text-sm mb-1 flex items-center gap-2" htmlFor="destination">
            <FaMapMarkerAlt /> To
          </label>
          <input
            id="destination"
            onChange={(e) => {
              const val = e.target.value;
              setDestination(val);
              debouncedFetchDestination(val);
            }}
            value={destination}
            type="text"
            placeholder="Enter destination city"
            className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            aria-autocomplete="list"
            aria-controls="destination-suggestions"
          />
          {destinationSuggestions.length > 0 && (
            <ul
              id="destination-suggestions"
              className="absolute top-full mt-1 z-10 bg-white text-black rounded-md shadow-lg max-h-40 overflow-y-auto w-full"
              role="listbox"
            >
              {destinationSuggestions.map((city, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-pink-100 cursor-pointer transition-colors"
                  onClick={() => {
                    setDestination(city.City);
                    setDestinationSuggestions([]);
                  }}
                  role="option"
                  aria-selected={false}
                >
                  {city.City}, {city.State}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2" htmlFor="date">
            <FaCalendarAlt /> Journey Date
          </label>
          <input
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
            className="p-2 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />
        </div>

        {/* Train Number */}
        <div className="flex flex-col">
          <label className="text-sm mb-1 flex items-center gap-2" htmlFor="train-number">
            <FaHashtag /> Train Number
          </label>
          <input
            id="train-number"
            onChange={(e) => setTrainNumber(e.target.value)}
            value={trainNumber}
            type="text"
            placeholder="Ex: 12345"
            className="p-2 rounded-md bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        {/* Seat Type */}
        <div className="flex flex-col sm:col-span-2">
          <label className="text-sm mb-1 flex items-center gap-2" htmlFor="seat-type">
            <FaThList /> Seat Type
          </label>
          <select
            id="seat-type"
            onChange={(e) => setSeatType(e.target.value)}
            value={seatType}
            className="p-2 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="" disabled>
              Select seat type
            </option>
            <option value="General">General</option>
            <option value="Sleeper">Sleeper</option>
            <option value="AC">AC</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGetTrains}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-pink-400 focus:outline-none"
      >
        Search Train
      </button>
      <ToastContainer />
    </div>
  );
};

export default TrainBookingForm;