import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrain } from '../utils/getTrainSlice';
import { BASE_URL } from '../utils/constants';
import Sidebar from './Sidebar';

const UpdateTrainPage = () => {
    const trains = useSelector((store) => store.train || []);
    const [generalSeats, setGeneralSeats] = useState('');
    const [sleeperSeats, setSleeperSeats] = useState('');
    const [acSeats, setAcSeats] = useState('');
    const [generalAmount, setGeneralAmount] = useState('');
    const [sleeperAmount, setSleeperAmount] = useState('');
    const [acAmount, setAcAmount] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [journeyDate, setJourneyDate] = useState('');
    const dispatch = useDispatch();
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showSuccessUpdateAlert, setShowSuccessUpdateAlert] = useState(false);

    const handleDeleteTrains = async (id) => {
        try {
            const res = await axios.delete(BASE_URL + '/delete/train/' + id, { withCredentials: true });
            console.log(res.data.message);
            if (res.status === 200) {
                setShowSuccessAlert(true);
                setShowModal1(false);
                getTrainDetails();
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000);
            }
        } catch (err) {
            console.error('Error deleting train:', err);
        }
    };

    const handleUpdateTrains = async (id) => {
        try {
            const seats = [
                { type: 'general', count: generalSeats },
                { type: 'sleeper', count: sleeperSeats },
                { type: 'ac', count: acSeats },
            ];
            const res = await axios.patch(
                BASE_URL + '/update/train/' + id,
                {
                    journeyDate,
                    arrivalTime: arrivalTime + ':00',
                    departureTime: departureTime + ':00',
                    seats,
                },
                { withCredentials: true }
            );
            console.log(res.data.message);
            if (res.status === 200) {
                setShowSuccessUpdateAlert(true);
                setShowModal(false);
                getTrainDetails();
                setTimeout(() => {
                    setShowSuccessUpdateAlert(false);
                }, 3000);
            }
        } catch (err) {
            console.error('Error updating train:', err);
        }
    };

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

    const formatTimeToHHMM = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const openUpdateModal = (trainData) => {
        setSelectedTrain(trainData);

        const seatMap = {};
        trainData.seats.forEach((seat) => {
            seatMap[seat.type] = seat.count;
        });

        const amountMap = {};
        trainData.amount.forEach((amt) => {
            amountMap[amt.type] = amt.amount;
        });

        setGeneralSeats(seatMap.general || '');
        setSleeperSeats(seatMap.sleeper || '');
        setAcSeats(seatMap.ac || '');

        setGeneralAmount(amountMap.general || '');
        setSleeperAmount(amountMap.sleeper || '');
        setAcAmount(amountMap.ac || '');

        setJourneyDate(new Date(trainData.journeyDate).toISOString().split('T')[0]);
        setDepartureTime(formatTimeToHHMM(trainData.departureTime));
        setArrivalTime(formatTimeToHHMM(trainData.arrivalTime));

        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedTrain(null);
        setShowModal(false);
    };

    const openUpdateModal1 = (trainData) => {
        setSelectedTrain(trainData);
        setShowModal1(true);
    };

    const closeModal1 = () => {
        setSelectedTrain(null);
        setShowModal1(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            {showSuccessAlert && (
                <div
                    role="alert"
                    className="fixed top-4 right-4 z-50 bg-green-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-lg w-11/12 sm:w-auto max-w-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-sm">Deleted Successfully</span>
                </div>
            )}
            {showSuccessUpdateAlert && (
                <div
                    role="alert"
                    className="fixed top-4 right-4 z-50 bg-green-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-lg w-11/12 sm:w-auto max-w-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-sm">Updated Successfully</span>
                </div>
            )}
            <div className="flex flex-1 flex-col sm:flex-row">
                <Sidebar />
                <main className="flex-1 p-4 sm:p-6 overflow-x-auto">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-blue-900">
                        Update Trains
                    </h1>

                    <div className="overflow-auto rounded-lg shadow bg-white">
                        <table className="min-w-full text-xs sm:text-sm text-left text-gray-700">
                            <thead className="bg-blue-200 text-blue-900">
                                <tr>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Number</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Name</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Source</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Destination</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Date</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Status</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Action</th>
                                    <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trains.map((t) => (
                                    <tr key={t._id} className="border-t hover:bg-blue-50">
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">{t.number}</td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">{t.name}</td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">{t.source}</td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">{t.destination}</td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            {new Date(t.journeyDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">{t.trainStatus}</td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <button
                                                onClick={() => openUpdateModal(t)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm"
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <button
                                                onClick={() => openUpdateModal1(t)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Modal for Update Train */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">Update Train</h2>
                        <div className="bg-white p-4 sm:p-6 rounded-xl">
                            <form className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Journey Date</label>
                                    <input
                                        type="date"
                                        name="journeyDate"
                                        value={journeyDate}
                                        onChange={(e) => setJourneyDate(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Departure Time</label>
                                    <input
                                        type="time"
                                        name="departureTime"
                                        value={departureTime}
                                        onChange={(e) => setDepartureTime(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Arrival Time</label>
                                    <input
                                        type="time"
                                        name="arrivalTime"
                                        value={arrivalTime}
                                        onChange={(e) => setArrivalTime(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">General Seats</label>
                                    <input
                                        type="number"
                                        value={generalSeats}
                                        onChange={(e) => setGeneralSeats(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        placeholder="100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Amount (General)</label>
                                    <input
                                        type="number"
                                        value={generalAmount}
                                        onChange={(e) => setGeneralAmount(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        placeholder="100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Sleeper Seats</label>
                                    <input
                                        type="number"
                                        value={sleeperSeats}
                                        onChange={(e) => setSleeperSeats(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        placeholder="50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Amount (Sleeper)</label>
                                    <input
                                        type="number"
                                        value={sleeperAmount}
                                        onChange={(e) => setSleeperAmount(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        placeholder="50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">AC Seats</label>
                                    <input
                                        type="number"
                                        value={acSeats}
                                        onChange={(e) => setAcSeats(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        placeholder="30"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-blue-800 mb-1 text-sm sm:text-base">Amount (AC)</label>
                                    <input
                                        type="number"
                                        value={acAmount}
                                        onChange={(e) => setAcAmount(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
                                        placeholder="30"
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="mt-4 sm:mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm"
                                onClick={() => handleUpdateTrains(selectedTrain._id)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Delete Train */}
            {showModal1 && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-4 sm:p-6 relative">
                        <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">Delete Train</h2>
                        <p className="text-xs sm:text-sm text-gray-600 mb-4">
                            Train Number: {selectedTrain.number}
                        </p>
                        <div className="mt-4 sm:mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal1}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm"
                                onClick={() => handleDeleteTrains(selectedTrain._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-blue-200 text-blue-900 text-center py-3 text-sm">
                © 2025 GoRail. All rights reserved.
            </footer>
        </div>
    );
};

export default UpdateTrainPage;