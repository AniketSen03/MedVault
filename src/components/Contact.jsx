import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    document.title = "Contact - MedVault";
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


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://med-vault-backend.vercel.app/contact", formData);
      alert(`Thank you ${formData.name}, we’ll get back to you soon!`);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 px-4 max-w-3xl mx-auto text-center">
      <h3 className="text-3xl font-bold mb-6 text-blue-700">Contact Us</h3>
      <p className="mb-4 text-gray-700">Have a question or feedback? We'd love to hear from you.</p>
      <form onSubmit={handleSubmit} className="space-y-6 text-left mt-8">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg" />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg" />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg" />
        <textarea name="message" rows="4" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg resize-none" />
        <button type="submit" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-800 w-full sm:w-auto transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
