// File: src/components/TrustedBy.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TrustedBy = () => {
   useEffect(() => {
            document.title = "Trusted By - MedVault";
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
    <section ref={sectionRef} className="py-16 px-6 bg-white text-center">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">Trusted By</h3>
        <p className="text-gray-700 mb-6">Our products are trusted by health professionals, wellness coaches, and thousands of satisfied users.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <img src="src/assets/trust1.avif" alt="Partner 1" className="choose-box h-28" />
          <img src="src/assets/trust2.png" alt="Partner 2" className="choose-box h-28" />
          <img src="src/assets/trust3.jpg" alt="Partner 3" className="choose-box h-28" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
