import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrain } from '../utils/getTrainSlice';
import { BASE_URL } from '../utils/constants';
import Sidebar from './Sidebar';
import { Tuple } from '@reduxjs/toolkit';

const UpdateTrainPage = () => {
    const trains = useSelector((store) => store.train || []);
    const [generalSeats, setGeneralSeats] = useState();
    const [sleeperSeats, setSleeperSeats] = useState();
    const [acSeats, setAcSeats] = useState();
    const [generalAmount, setGeneralAmount] = useState();
    const [sleeperAmount, setSleeperAmount] = useState();
    const [acAmount, setAcAmount] = useState();
    const [departureTime, setDepartureTime] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [journeyDate, setJourneyDate] = useState()
    const dispatch = useDispatch();
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const[showModal1, setShowModal1] = useState(false);
const[showSuccessAlert, setShowSuccessAlert] = useState(false);
const [showSuccessUpdateAlert, setShowSuccessUpdateAlert] = useState(false);
    const handleDeleteTrains=async(id)=>{
        try{
            const res=await axios.delete(BASE_URL+'/delete/train/'+id,{withCredentials:true})
            console.log(res.data.message)
            if(res.status===200){
                setShowSuccessAlert(true)
                showModal1(false)
                window.location.reload()
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000); // Hide the alert after 3 seconds
            }
        }catch(err){
            console.error('Error deleting train:', err);
        }
    }
    const handleUpdateTrains=async(id)=>{
        try{
           const seats=[
                {type:'general',count:generalSeats},
                {type:'sleeper',count:sleeperSeats},
                {type:'ac',count:acSeats}
            ]
            const res= await axios.patch(BASE_URL+'/update/train/'+id,{
              journeyDate,
              arrivalTime,
              departureTime,
              seats,
            },{withCredentials:true})
            console.log(res.data.message)
            if(res.status===200){
             setShowSuccessUpdateAlert(true)
             setShowModal(false)
             setTimeout(() => {
                setShowSuccessUpdateAlert(false);
            },3000)}
        }catch(err){
            console.error('Error updating train:', err);
        }
    }
    const getTrainDetails = async () => {
        try {
            const response = await axios.get(BASE_URL + '/view/trains', {
                withCredentials: true,
            });
            dispatch(addTrain(response.data.trains));
        } catch (err) {
            console.error('Error fetching train data:', err);
        }
    };

    useEffect(() => {
        getTrainDetails();
    }, []);

    const openUpdateModal = (trainData) => {
        setSelectedTrain(trainData);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedTrain(null);
        setShowModal(false);
    };
    const openUpdateModal1 = (trainData) => {
        setSelectedTrain(trainData);
        setShowModal1(true);
    }
    const closeModal1 = () => {
        setSelectedTrain(null);
        setShowModal1(false);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            {showSuccessAlert&&(
                 <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span>Deleted Succesfully</span>
               </div>
            )}
             {showSuccessUpdateAlert&&(
                 <div role="alert" className="alert alert-success absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded flex items-center gap-2 shadow-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span>Updated Succesfully</span>
               </div>
            )}
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 overflow-x-auto">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">
                        Update Trains
                    </h1>

                    <div className="overflow-auto rounded-lg shadow bg-white">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-blue-200 text-blue-900">
                                <tr>
                                    <th className="px-4 py-2 whitespace-nowrap">Number</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Name</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Source</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Destination</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Date</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Status</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Action</th>
                                    <th className="px-4 py-2 whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trains.map((t) => (
                                    <tr key={t._id} className="border-t hover:bg-blue-50">
                                        <td className="px-4 py-2">{t.number}</td>
                                        <td className="px-4 py-2">{t.name}</td>
                                        <td className="px-4 py-2">{t.source}</td>
                                        <td className="px-4 py-2">{t.destination}</td>
                                        <td className="px-4 py-2">
                                            {new Date(t.journeyDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">{t.trainStatus}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => openUpdateModal(t)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                                            >
                                                Update
                                            </button>

                                        </td>
                                        <td className='px-4 py-2'> <button
                                            onClick={() => openUpdateModal1(t)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Delete
                                        </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
                        <h2 className="text-xl font-bold text-blue-800 mb-2">Update Train</h2>
                        <div className='bg-white p-6 rounded-xl shadow max-w-3xl mx-auto'>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1">Journey Date</label>
                                    <input
                                        type="date"
                                        name="journeyDate"
                                        value={new Date(selectedTrain.journeyDate).toISOString().split('T')[0]}
                                        onChange={(e) => setJourneyDate(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-blue-800 mb-1">Departure Time</label>
                                    <input
                                        type="time"
                                        name="departureTime"
                                        value={new Date(selectedTrain.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        onChange={(e) => setDepartureTime(e.target.value+':00')}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-blue-800 mb-1">Arrival Time</label>
                                    <input
                                        type="time"
                                        name="arrivalTime"
                                        value={new Date(selectedTrain.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        onChange={(e) => setArrivalTime(e.target.value +':00')}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-blue-800 mb-1">General Seats</label>
                                    <input
                                        type="number"
                                        
                                        onChange={(e) => setGeneralSeats(e.target.value)}
                                        value={generalSeats}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="100"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-blue-800 mb-1">Amount (General)</label>
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
                                    <label className="block font-medium text-blue-800 mb-1">Amount (Sleeper)</label>
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
                                    <label className="block font-medium text-blue-800 mb-1">Amount (AC)</label>
                                    <input
                                        type="number"
                                        value={acAmount}
                                        onChange={(e) => setAcAmount(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="30"
                                        required
                                    />
                                </div>
                            </form>

                        </div>
                        {/* Update form fields go here */}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={(e)=>handleUpdateTrains(selectedTrain._id)}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        {/* Modal for Delete Train */}
        {showModal1 &&( <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Delete Train</h2>
            <p className="text-sm text-gray-600 mb-4">
              Train Number: {selectedTrain.number}
            </p>
            {/* Update form fields go here */}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal1}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={(e)=>handleDeleteTrains(selectedTrain._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
            {/* Footer */}
            <footer className="bg-blue-200 text-blue-900 text-center py-3">
                © 2025 GoRail. All rights reserved.
            </footer>
        </div>
    );
};

export default UpdateTrainPage;
