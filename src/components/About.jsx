import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    document.title = "About - MedVault";
  }, []);
  
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const img = imageRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
  img,
  { opacity: 0, scale: 1.02, x: -30 },
  {
    opacity: 1,
    scale: 1,
    x: 0,
    duration: 1.6,
    delay: 0.3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: img,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  }
);
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10 text-left md:text-center">About us</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image & Arrow */}
          <div className="flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden w-[320px] h-[220px] md:w-[340px] md:h-[230px] mb-4">
              <img ref={imageRef}
                src="/About.jpg"
                alt="About MedVault"
                className="object-cover"
              />
            </div>

          </div>
          {/* Text & Button */}
          <div className="flex-1 flex flex-col justify-center items-start">
            <p className="text-gray-700 text-base md:text-lg mb-6">
              At <span className="font-bold text-blue-700">MedVault</span>, our mission is to enhance global healthcare by delivering high-quality, safe, and effective medicines to the communities that need them most. Founded with a commitment to innovation and excellence, we specialize in providing a diverse range of pharmaceutical products that meet the highest standards of quality and safety.
            </p>
            <Link
              to={'/about'}
              className="inline-flex items-center bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition hover:translate-x-3 delay-150 duration-300 ease-in-out hover:shadow-lg"
            >
              Learn More
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                <path d="M5 10h10M13 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;