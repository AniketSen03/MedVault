import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const Signup = ({ setUser }) => {
    useEffect(() => {
        document.title = "Signup - MedVault";
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


    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/signup", {
                name: form.name,
                email: form.email,
                password: form.password,
            });

            alert("Signup successful!");
            console.log(response.data);

            // in Login.jsx or Signup.jsx
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user); // update parent state



            navigate("/"); // redirect
        } catch (err) {
            console.error("Signup error:", err);
            alert("Signup failed");
            setError(err.response?.data?.message || "Signup failed");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div ref={cardRef} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div ref={(el) => formItemsRef.current[0] = el}>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div ref={(el) => formItemsRef.current[1] = el}>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div ref={(el) => formItemsRef.current[2] = el}>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <div ref={(el) => formItemsRef.current[3] = el}>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    {error && (
                        <div className="text-blue-500 text-sm text-center">{error}</div>
                    )}
                    <button ref={(el) => formItemsRef.current[4] = el}
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-blue-600">
                    Already have an account?{" "}
                    <a href="/login" className="underline hover:text-blue-800">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;