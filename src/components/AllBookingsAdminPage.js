import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import Login from "../components/Login";
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addAllBookings } from '../utils/allBookingAdminSlice';
import { addAllUser } from '../utils/allUsersSlice';

const AllBookingsAdminPage = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((store) => store.allBooking || []);
    const user = useSelector((store) => store.user || []);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    // Fetch booking data
    const getBookingData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/bookings`, { withCredentials: true });
            dispatch(addAllBookings(res?.data?.bookings || []));
        } catch (err) {
        }
    };

    useEffect(() => {
        getBookingData();
    }, []); // ✅ Added empty dependency array to avoid infinite loop

    // Handle journey status update
    const handleJourneyStatusUpdate = async (bookingId, status) => {
        try {
            const res = await axios.post(`${BASE_URL}/verifybooking/${status}/${bookingId}`, {}, { withCredentials: true });

            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 5000);
            getBookingData();
        } catch (err) {


            const message = err?.response?.data?.message || "Something went wrong";
            setErrorMessage(message);

            setTimeout(() => setErrorMessage(''), 3000);
        }
    };


    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">

            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirm Update</h2>
                        <p className="mb-6">Do you want to update this booking?</p>
                        <div className="flex justify-around">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => {
                                    setShowAlert(false);
                                    handleJourneyStatusUpdate(selectedBookingId, "confirmed");
                                }}
                            >
                                Confirmed
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => {
                                    setShowAlert(false);
                                    handleJourneyStatusUpdate(selectedBookingId, "cancelled");
                                }}
                            >
                                Cancelled
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Alert */}
            {showSuccessAlert && (
                <div role="alert" className="absolute top-4 right-4 z-50 bg-green-500 text-white p-4 rounded shadow-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Update successful!!</span>
                </div>
            )}

            {/* Error Alert */}
            {errorMessage && (
                <div role="alert" className="absolute top-4 right-4 z-50 bg-red-500 text-white p-4 rounded shadow-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-white" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}

            {user ? (
                <div className="flex flex-1 flex-col lg:flex-row">
                    <Sidebar />
                    <main className="flex-1 p-4 sm:p-6">
                        <div className="bg-blue-100 p-4 rounded-lg mb-6 shadow">
                            <h2 className="text-xl font-semibold text-blue-800">All Bookings 📄</h2>
                            <p className="text-sm text-blue-700">Detailed list of all bookings on GoRail</p>
                        </div>

                        <div className="mt-4 bg-white p-4 rounded-xl shadow overflow-x-auto">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">Bookings Table</h2>
                            <div className="overflow-auto max-h-[500px]">
                                <table className="table-auto w-full border-collapse border border-blue-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="border px-4 py-2">Booking ID</th>
                                            <th className="border px-4 py-2">User Name</th>
                                            <th className="border px-4 py-2">Source</th>
                                            <th className="border px-4 py-2">Destination</th>
                                            <th className="border px-4 py-2">Seat Type</th>
                                            <th className="border px-4 py-2">Booking Date</th>
                                            <th className="border px-4 py-2">Payment Status</th>
                                            <th className="border px-4 py-2">Journey Status</th>
                                            <th className="border px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-blue-900">
                                        {bookings.length > 0 ? (
                                            bookings.map((booking, index) => {
                                                const bookingDate = new Date(booking.createdAt).toLocaleDateString();
                                                const isConfirmed = booking.journeyStatus === "confirmed";
                                                const isCancelled = booking.journeyStatus === "cancelled";

                                                return (
                                                    <tr key={index} className="hover:bg-blue-100">
                                                        <td className="border px-4 py-2">{booking._id}</td>
                                                        <td className="border px-4 py-2">{booking.name || "N/A"}</td>
                                                        <td className="border px-4 py-2">{booking.source || "N/A"}</td>
                                                        <td className="border px-4 py-2">{booking.destination || "N/A"}</td>
                                                        <td className="border px-4 py-2">{booking.seatType}</td>
                                                        <td className="border px-4 py-2">{bookingDate}</td>
                                                        <td className="border px-4 py-2">{booking.paymentStatus}</td>
                                                        <td className={`border px-4 py-2 font-semibold ${isConfirmed ? "text-green-600" : "text-red-600"}`}>
                                                            {booking.journeyStatus || "Pending"}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {isCancelled ? (
                                                                <button className="text-red-700 font-medium btn-primary">Cancelled</button>
                                                            ) : isConfirmed ? (
                                                                <button className="text-green-700 font-medium">Confirmed</button>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-accent"
                                                                    onClick={() => {
                                                                        setShowAlert(true);
                                                                        setSelectedBookingId(booking._id);
                                                                    }}
                                                                >
                                                                    Update
                                                                </button>
                                                            )}
                                                        </td>


                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="text-center py-4 text-blue-600">
                                                    No bookings available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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

export default AllBookingsAdminPage;
