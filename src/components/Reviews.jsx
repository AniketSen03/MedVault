import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
    useEffect(() => {
        document.title = "Reviews - MedVault";
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

    const reviews = [
        {
            name: "Dr. Aisha Sharma",
            role: "General Physician",
            comment:
                "An excellent resource to quickly find reliable medication information. Very helpful in my daily practice!",
            rating: 5,
        },
        {
            name: "Rohan Mehta",
            role: "Patient",
            comment:
                "Clean UI and the search by disease option is super useful. Helped me understand my prescriptions better.",
            rating: 4,
        },
        {
            name: "Nurse Priya R.",
            role: "Healthcare Worker",
            comment:
                "This tool saves me time when explaining medication to patients. Clear and concise information.",
            rating: 4,
        },
    ];

    return (
        <section  ref={sectionRef} className="py-16 px-4 bg-blue-50">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10">
                    What People Say
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="choose-box bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                        >
                            <p className="text-gray-700 font-semibold text-left text-sm mb-4">"{review.comment}"</p>
                            <div className="mt-auto text-right">
                                <p className="font-semibold text-blue-700">{review.name}</p>
                                <p className="text-xs text-gray-500">{review.role}</p>
                                <div className="flex mt-1 justify-end">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-yellow-400 ${i < review.rating ? "" : "text-gray-300"
                                                }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
