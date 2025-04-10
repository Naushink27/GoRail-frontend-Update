import React, { useEffect, useState } from 'react';

const services = [
  {
    img: 'https://www.railway-technology.com/wp-content/uploads/sites/13/2018/06/indianrailways.jpg',
    title: 'Fast Train Booking',
    desc: 'Book your train tickets instantly with real-time availability.',
  },
  {
    img: 'https://img.etimg.com/thumb/width-1200,height-1200,imgsize-33208,resizemode-75,msid-98281540/news/new-updates/travelling-by-indian-railways-here-are-7-major-rules-you-must-know.jpg',
    title: 'Luxury Cabins',
    desc: 'Experience premium comfort with our luxury cabin options.',
  },
  {
    img: 'https://images.unsplash.com/photo-1592844002373-a55ecd7af140?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwcmFpbHdheXxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Onboard Meals',
    desc: 'Delicious meals served right at your seat.',
  },
];

const Services = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 4000); // autoplay every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
  {services.map((item, idx) => (
    <div
      key={idx}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <img
        src={item.img}
        alt={item.title}
        className="object-cover w-full h-full"
      />

      {/* Text Overlay with Gradient & No Blur */}
      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h3 className="text-2xl font-bold">{item.title}</h3>
        <p className="text-sm">{item.desc}</p>
      </div>
    </div>
  ))}
</div>

  );
};

export default Services;
