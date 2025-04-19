import React from 'react';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux';
import Login from "../components/Login";

const AllBookingsAdminPage = () => {
    const bookings = useSelector((store) => store.allBooking);
    const user = useSelector((store) => store.user);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
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
                                            <th className="border px-4 py-2">BookingDate</th>
                                            <th className="border px-4 py-2">Payment Status</th>
                                            <th className="border px-4 py-2">journeyStatus</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-blue-900">
                                        {bookings.length > 0 ? (
                                            bookings.map((booking, index) => {
                                                const bookingDate = new Date(booking.createdAt).toLocaleDateString();
                                                return (
                                                    <tr key={index} className="hover:bg-blue-100">
                                                        <td className="border px-4 py-2">{booking._id}</td>
                                                        <td className="border px-4 py-2">{booking.name || "N/A"}</td>
                                                        <td className="border px-4 py-2">{booking.source || "N/A"}</td>
                                                        <td className="border px-4 py-2">{booking.destination || "N/A"}</td>
                                                        <td className="border px-4 py-2">
                                                          {booking.seatType}
                                                        </td>
                                                        <td className="border px-4 py-2">{bookingDate}</td>
                                                        <td className="border px-4 py-2">{booking.paymentStatus}</td>
                                                        <td className={`border px-4 py-2 font-semibold ${
                                                            booking.journeyStatus === "confirmed" ? "text-green-600" : "text-red-600"
                                                        }`}>
                                                            {booking.journeyStatus || "Pending"}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4 text-blue-600">
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
            ) : <Login />}
            <Footer />
        </div>
    );
};

export default AllBookingsAdminPage;
