import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";


const Login = ({ setUser }) => {
  useEffect(() => {
    document.title = "Login - MedVault";
  }, []);

  const cardRef = useRef(null);
  const formItemsRef = useRef([]);
  formItemsRef.current = [];
useLayoutEffect(() => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });

  tl.fromTo(
    cardRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0 }
  );

  tl.fromTo(
    formItemsRef.current,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.2 },
    "-=0.4" // Overlap with card animation
  );
}, []);


  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // ✅ initialize

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://med-vault-backend.vercel.app/login", form);

      alert("Login successful!");
      setSuccess("Login successful!");
      console.log(response.data.user);

      // in Login.jsx or Signup.jsx
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user); // update parent state


      navigate("/"); // redirect to home

    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      alert(message);

      if (message === "User not found") {
        navigate("/signup"); // Optional: redirect to signup
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div ref={cardRef} className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div ref={(el) => formItemsRef.current[0] = el}> 
            <label className="block text-blue-700 font-semibold mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div ref={(el) => formItemsRef.current[1] = el}>
            <label className="block text-blue-700 font-semibold mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-blue-600 text-sm text-center">{error}</p>}
          {success && <p className="text-blue-600 text-sm text-center">{success}</p>}
          <button ref={(el) => formItemsRef.current[2] = el} type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-blue-600">Don't have an account? </span>
          <a href="/signup" className="text-blue-600 hover:underline text-sm font-semibold">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
