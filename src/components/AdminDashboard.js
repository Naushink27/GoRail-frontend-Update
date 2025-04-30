import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import Footer from '../components/Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addTrain } from '../utils/getTrainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addAllUser } from '../utils/allUsersSlice';
import { addAllBookings } from '../utils/allBookingAdminSlice';
import Login from '../components/Login'

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user || []);
    const train = useSelector((store) => store.train || []);
    const users = useSelector((store) => store.allUser || []);
    const bookings = useSelector((store) => store.allBooking || []);

    const [trainStatuses, setTrainStatuses] = useState([]);

    let trainCount = 0;
    train.forEach((trainItem) => {
        if (trainItem.seats.some(seat => seat.count > 0)) {
            trainCount++;
        }
    });

    const getTrainData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/view/trains', { withCredentials: true });
            const trainList = response.data.trains;
            dispatch(addTrain(trainList));

            const statuses = trainList.map((trainItem) => {
                const hasAvailableSeats = trainItem.seats.some(seat => seat.count > 0);
                return hasAvailableSeats ? "Available" : "Unavailable";
            });

            setTrainStatuses(statuses);
        } catch (error) {
        }
    };

    const getUsersData = async () => {
        try {
            const res = await axios.get(BASE_URL + '/view/users', { withCredentials: true });
            dispatch(addAllUser(res?.data?.data || []));
        } catch (err) {
        }
    }

    const getBookingData = async () => {
        try {
            const res = await axios.get(BASE_URL + '/bookings', { withCredentials: true });
            dispatch(addAllBookings(res?.data?.bookings || []));
        } catch (err) {
        }
    }

    useEffect(() => {
        getTrainData();
        getUsersData();
        getBookingData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            {user ? (
                <div className="flex flex-1 flex-col lg:flex-row">
                    <Sidebar />
                    <main className="flex-1 p-4 sm:p-6">
                        <div className="bg-blue-100 p-4 rounded-lg mb-6 shadow">
                            <h2 className="text-xl font-semibold text-blue-800">Welcome back, Admin!</h2>
                            <p className="text-sm text-blue-700">Here's what's happening on GoRail today 🚆</p>
                        </div>
                        <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard title="Users" count={users.length} buttonText="View More" link='/allUsers' />
                            <StatCard title="Active Trains" count={trainCount} />
                            <StatCard title="All Bookings" count={bookings.length} buttonText="View More" link="/allBookingsAdmin" />
                        </div>
                        <div className="mt-8 bg-white p-4 rounded-xl shadow overflow-x-auto">
                            <h2 className="text-xl font-semibold text-blue-800 mb-4">Train Data</h2>
                            <div className="overflow-auto max-h-[500px]">
                                <table className="table-auto w-full border-collapse border border-blue-300">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="border border-blue-300 px-4 py-2">Train No</th>
                                            <th className="border border-blue-300 px-4 py-2">Name</th>
                                            <th className="border border-blue-300 px-4 py-2">Source</th>
                                            <th className="border border-blue-300 px-4 py-2">Destination</th>
                                            <th className="border border-blue-300 px-4 py-2">Journey Date</th>
                                            <th className="border border-blue-300 px-4 py-2">Departure</th>
                                            <th className="border border-blue-300 px-4 py-2">Arrival</th>
                                            <th className="border border-blue-300 px-4 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-blue-900">
                                        {train.length > 0 ? (
                                            train.map((trainItem, index) => {
                                                const journeyDate = new Date(trainItem.journeyDate).toLocaleDateString();
                                                const departureTime = new Date(trainItem.departureTime).toLocaleTimeString();
                                                const arrivalTime = new Date(trainItem.arrivalTime).toLocaleTimeString();
                                                const status = trainStatuses[index];

                                                return (
                                                    <tr key={index} className="hover:bg-blue-100">
                                                        <td className="border border-blue-300 px-4 py-2">{trainItem.number}</td>
                                                        <td className="border border-blue-300 px-4 py-2">{trainItem.name}</td>
                                                        <td className="border border-blue-300 px-4 py-2">{trainItem.source}</td>
                                                        <td className="border border-blue-300 px-4 py-2">{trainItem.destination}</td>
                                                        <td className="border border-blue-300 px-4 py-2">{journeyDate}</td>
                                                        <td className="border border-blue-300 px-4 py-2">{departureTime}</td>
                                                        <td className="border border-blue-300 px-4 py-2">{arrivalTime}</td>
                                                        <td className={`border border-blue-300 px-4 py-2 font-bold ${status === "Available" ? "text-green-600" : "text-red-600"}`}>
                                                            {status}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-4 text-blue-600">No train data available</td>
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
            <Footer />
        </div>
    );
};

export default AdminDashboard;
