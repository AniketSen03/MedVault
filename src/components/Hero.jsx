import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Add your image paths here
const images = [
  "/Banner1.jpg",
  "/Banner2.jpg",
  "/Banner3.jpg",
  "/Banner4.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section
      className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center"
      style={{
        backgroundImage: `url('${images[current]}')`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-700/60"></div>
      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow"
        aria-label="Previous Slide"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow"
        aria-label="Next Slide"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* Content */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center w-full px-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto items-center justify-center">
          <Link to="products"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow flex items-center gap-2 hover:bg-blue-700 hover:text-white  w-full sm:w-auto justify-center transition hover:translate-x-2 delay-150 duration-300 ease-in-out hover:shadow-lg"
          >
            Explore Medicines
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M5 10h10M13 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="contact"
            className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow flex items-center gap-2 hover:bg-white hover:text-blue-700 w-full sm:w-auto justify-center transition hover:translate-x-2 delay-150 duration-300 ease-in-out hover:shadow-lg"
          >
            Contact Us
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M5 10h10M13 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        {/* Dots */}
        <div className="flex space-x-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full ${current === idx ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;