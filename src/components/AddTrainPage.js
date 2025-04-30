import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux';
import Login from "../components/Login";
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const AddTrainPage = () => {
    const user = useSelector((store) => store.user);
    const [number, setNumber] = useState();
    const [name, setName] = useState();
    const [source, setSource] = useState();
    const [destination, setDestination] = useState();
    const [departureTime, setDepartureTime] = useState();
    const [arrivalTime, setArrivalTime] = useState();

    const [amount, setAmount] = useState();
    const [generalSeats, setGeneralSeats] = useState();
    const [sleeperSeats, setSleeperSeats] = useState();
    const [acSeats, setAcSeats] = useState();
    const [generalAmount, setGeneralAmount] = useState();
    const [sleeperAmount, setSleeperAmount] = useState();
    const [acAmount, setAcAmount] = useState();
    const[journeyDate,setJourneyDate]=useState()
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const seatData = [
                { type: 'General', count: generalSeats },
                { type: 'Sleeper', count: sleeperSeats },
                { type: 'AC', count: acSeats }
            ]
            const amountData=[
                {type:'General',amount:generalAmount},
                {type:'Sleeper',amount:sleeperAmount},
                {type:'AC',amount:acAmount}
            ]

         const res= await axios.post(BASE_URL+'/add/train',{
            number,
            name,
            source,
            destination,
            departureTime,
            arrivalTime,
            seats:seatData,
            journeyDate,
            amount:amountData},{withCredentials:true})
          if(res.status==201){  setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);}
        
        } catch (err) {
           const message=err.response.data.message||'Something went wrong!'
            setShowErrorAlert(message)
            setTimeout(()=>{
                setShowErrorAlert()
            },3000)
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            {showSuccessAlert && (
                <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Train added successfully!</span>
                </div>
            )}
             {showErrorAlert && (
                <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-red-600 text-white p-4 rounded flex items-center gap-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{showErrorAlert}</span>
                </div>
            )}

            {user ? (
                <div className="flex flex-1 flex-col lg:flex-row">
                    <Sidebar />
                    <main className="flex-1 p-4 sm:p-6">
                        <div className="bg-blue-100 p-4 rounded-lg mb-6 shadow">
                            <h2 className="text-xl font-semibold text-blue-800">Add New Train 🚆</h2>
                            <p className="text-sm text-blue-700">Enter details below to register a new train in GoRail</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                        <label className="block font-medium text-blue-800 mb-1">Train Number</label>
                                        <input type="text" name="trainName" value={number} onChange={(e) => setNumber(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="Enter train name" required />
                                    </div>
                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Train Name</label>
                                        <input type="text" name="trainName" value={name} onChange={(e) => setName(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="Enter train name" required />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Source</label>
                                        <input type="text" name="source" value={source} onChange={(e) => setSource(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="Enter source station" required />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Destination</label>
                                        <input type="text" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="Enter destination station" required />
                                    </div>
                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Journey Date</label>
                                        <input type="date" name="destination" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="Enter destination station" required />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Departure Time</label>
                                        <input type="time" name="departureTime" value={departureTime} onChange={(e) => setDepartureTime(e.target.value+':00')}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            required />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Arrival Time</label>
                                        <input type="time" name="arrivalTime" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value+':00')}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            required />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">General Seats</label>
                                        <input
                                            type="number"
                                            value={generalSeats}
                                            onChange={(e) => setGeneralSeats(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="100"
                                            required
                                            
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Sleeper Seats</label>
                                        <input
                                            type="number"
                                            value={sleeperSeats}
                                            onChange={(e) => setSleeperSeats(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="50"
                                            required
                                            
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">AC Seats</label>
                                        <input
                                            type="number"
                                            value={acSeats}
                                            onChange={(e) => setAcSeats(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="30"
                                           required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Amount(General Seats)</label>
                                        <input
                                            type="number"
                                            value={generalAmount}
                                            onChange={(e) => setGeneralAmount(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="100"
                                            required
                                            
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Amount(Sleeper Seats)</label>
                                        <input
                                            type="number"
                                            value={sleeperAmount}
                                            onChange={(e) => setSleeperAmount(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="50"
                                            required
                                           
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-medium text-blue-800 mb-1">Amount(AC Seats)</label>
                                        <input
                                            type="number"
                                            value={acAmount}
                                            onChange={(e) => setAcAmount(e.target.value)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                            placeholder="30"
                                          required
                                        />
                                    </div>


                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md"
                                    >
                                        Add Train
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            ) : (
                <Login />
            )}
         <footer className="bg-blue-200 text-blue-900 text-center py-3">
                © 2025 GoRail. All rights reserved.
            </footer>
        </div>
    );
};

export default AddTrainPage;
