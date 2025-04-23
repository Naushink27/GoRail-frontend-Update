import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Trains from "./components/Trains";
import Loader from './components/Loader';
import Login from "./components/Login";
import Book from "./components/Book";

import AllBookings from "./components/AllBookings";
import AdminDashboard from "./components/AdminDashboard";
import AllUsers from "./components/AllUsers";
import AllBookingsAdminPage from "./components/AllBookingsAdminPage";
import AddTrainPage from "./components/AddTrainPage";
import UpdateTrainPage from "./components/UpdateTrainPage";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // ✅ Redirect based on user role
  useEffect(() => {
    if (!user) return;
  
    const isOnPublicRoute = ["/login", "/"].includes(location.pathname);
    const isOnAdminRoute = [
      "/adminDashboard",
      "/allUsers",
      "/allBookingsAdmin",
      "/addTrain",
      "/updateTrain"
    ].includes(location.pathname);
  
    if (user.role === "admin" && !isOnAdminRoute) {
      navigate("/adminDashboard");
    } else if (user.role === "user" && isOnPublicRoute) {
      navigate("/");
    }
  }, [user, navigate, location.pathname]);
  

  // ✅ Show loader on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Routes>
          {/* ✅ If no user or if user is normal user */}
          {(!user || user.role === "user") && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/trains" element={<Trains />} />
              <Route path="/book" element={<Book />} />
              <Route path="/allbookings" element={<AllBookings />} />
            </>
          )}

          {/* ✅ Login route always available */}
          <Route path="/login" element={<Login />} />

          {/* ✅ If user is admin only show admin routes */}
          {user?.role === "admin" && (
            <>
              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path="/allUsers" element={<AllUsers />} />
              <Route path="/allBookingsAdmin" element={<AllBookingsAdminPage />} />
              <Route path="/addTrain" element={<AddTrainPage />} />
              <Route path="/updateTrain" element={<UpdateTrainPage />} />
            </>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;
