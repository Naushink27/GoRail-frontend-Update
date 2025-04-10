import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import Services from './Services';
import { FaTrain } from "react-icons/fa";
import TrainBookingForm from './TrainBookingForm';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1 p-4 gap-6">
        {/* Left Section */}
       {/* Left Section with Form */}
<div className="flex-1 ">

<TrainBookingForm/>

</div>


        {/* Right Section with Carousel */}
        <div className="flex-1 min-h-[300px] max-h-[500px] rounded-xl">
          <Services />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
