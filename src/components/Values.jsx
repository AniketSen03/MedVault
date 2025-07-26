// File: src/components/Values.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Values = () => {
  useEffect(() => {
    document.title = "Values - MedVault";
  }, []);

  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Fade in entire section
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    // Target and animate each box with stagger
    const boxes = gsap.utils.toArray(".choose-box");
    boxes.forEach((box, i) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section useRef={sectionRef} className="py-16 px-6 bg-blue-50">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-8">Our Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="choose-box p-6 bg-white rounded shadow">
            <h4 className="font-bold text-xl text-blue-700 mb-2">Trust & Safety</h4>
            <p className="text-gray-700">
              We are committed to providing only verified, authentic, and safe medical products.
            </p>
          </div>
          <div className="choose-box p-6 bg-white rounded shadow">
            <h4 className="font-bold text-xl text-blue-700 mb-2">Health Innovation</h4>
            <p className="text-gray-700">
              MedVault embraces technology to enhance healthcare access and improve outcomes.
            </p>
          </div>
          <div className="choose-box p-6 bg-white rounded shadow">
            <h4 className="font-bold text-xl text-blue-700 mb-2">Patient-Centric Care</h4>
            <p className="text-gray-700">
              Every feature we build is designed to prioritize your health, comfort, and convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
