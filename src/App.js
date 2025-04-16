import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About"; 
import Contact from "./pages/Contact";
import Trains from "./components/Trains";
import React from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './components/Loader';
import { persistor } from '../src/utils/appStore';
import { PersistGate } from 'redux-persist/integration/react';
import Login from "./components/Login";
import Book from "./components/Book";
import AllBookings from "./components/AllBookings";

function App() {

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1200); // show loader for 1.2s
    return () => clearTimeout(timeout);
  }, [location]);
  return (
    <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
    <>
    {loading && <Loader />}
    {!loading && ( <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/trains" element={<Trains />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/book' element={<Book/>} />
      <Route path='/allbookings' element={<AllBookings/>}/>
    </Routes>)}
   
    </>
    </PersistGate>
    </Provider>
  );
}

export default App;
