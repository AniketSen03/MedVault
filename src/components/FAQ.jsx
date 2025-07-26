import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
 {
    question: "How does MedVault help identify the right medicine for my disease?",
    answer:
      "MedVault uses verified APIs to fetch accurate data that maps each medicine to the disease it treats, helping users make safe, informed decisions.",
  },
  {
    question: "Can I see side effects and warnings before buying?",
    answer:
      "Yes, every medicine listed in MedVault includes side effects, usage warnings, and dosage guidelines sourced from trusted medical databases.",
  },
  {
    question: "Is there any discount on purchases?",
    answer:
      "We offer up to 10% discount through verified purchase links available on each medicine’s detail page.",
  },
  {
    question: "Does MedVault support regional Indian languages?",
    answer:
      "Currently, MedVault is available in English, and we're working on expanding to major Indian languages to increase accessibility for all users.",
  },
  {
    question: "What if I want to compare two medicines?",
    answer:
      "Our smart search allows you to compare different brands, their pricing, ingredients, and reviews side by side.",
  },
  {
    question: "Are the reviews on medicines real?",
    answer:
      "Yes, reviews come from real users who’ve purchased and used the medicine, making them more trustworthy and relevant.",
  },
  {
    question: "Can I upload my prescription to find relevant medicines?",
    answer:
      "This feature is under development. Soon, users will be able to upload prescriptions and get detailed information about each medicine mentioned.",
  },
];

const FAQ = () => {
   useEffect(() => {
            document.title = "FAQ - MedVault";
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


  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleIndex = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx]
    );
  };

  return (
    <section ref={sectionRef} id="faq" className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">FAQ</h3>
        <p className="text-lg font-semibold text-center mb-8 text-gray-700">
           Find clear answers to your common questions about using MedVault.
        </p>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="choose-box py-4">
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleIndex(idx)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndexes.includes(idx) ? (
                  <span className="text-2xl text-gray-500">&times;</span>
                ) : (
                  <span className="text-2xl text-gray-500">+</span>
                )}
              </button>
              {openIndexes.includes(idx) && (
                <p className="mt-2 text-gray-600 text-sm">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;