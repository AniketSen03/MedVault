// File: src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate, } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Header from "./components/Header";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Products from "./components/Products";
import Values from "./components/Values";
import TrustedBy from "./components/TrustedBy";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Productdetails from "./components/Productdetails";
import Cart from "./components/Cart";
import Buy from "./components/Buy";
import BlogDetails from "./components/BlogDetails";
import LenisWrapper from "./LenisWrapper";
import CustomCursor from "./Customcursor";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [buyNowItem, setBuyNowItem] = useState(() => {
    const storedItem = localStorage.getItem("buyNowItem");
    return storedItem ? JSON.parse(storedItem) : null;
  });

  // ✅ Use full user object instead of just userEmail
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const userEmail = user?.email || "";

  const addToCart = (item) => {
    if (!user || !user.email) {
      alert("Please login or signup to continue.");
      return;
    }

    const name = item.name || item.openfda?.brand_name?.join(", ") || "Unknown";
    const price = item.price || 100;
    const image = item.image || "https://via.placeholder.com/150";

    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...prev, { name, price, image, quantity: 1 }];
      }

      axios
        .post("https://med-vault-backend.vercel.app/api/cart", {
          items: updatedCart,
          user: userEmail,
        })
        .then(() => {
          alert(`${name} has been added to the cart.`);
        })
        .catch((err) => {
          console.error("Error saving to cart:", err);
        });

      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => {
      const updated = prev.map((item, index) =>
        index === id ? { ...item, quantity } : item
      );

      axios
        .post("https://med-vault-backend.vercel.app/api/cart", {
          items: updated,
          user: userEmail,
        })
        .catch((err) => {
          console.error("Failed to update quantity in MongoDB:", err);
        });

      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((_, index) => index !== id);

      axios
        .post("https://med-vault-backend.vercel.app/api/cart", {
          items: updated,
          user: userEmail,
        })
        .catch((err) => {
          console.error("Error syncing removal:", err);
        });

      return updated;
    });
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <LenisWrapper>
      <BrowserRouter>
        <CustomCursor />
        <Header user={user} setUser={setUser} cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} setBuyNowItem={setBuyNowItem} />} />
          <Route path="/about" element={<About />} />
          <Route path="/whychooseus" element={<WhyChooseUs />} />
          <Route path="/products" element={<Products user={user} addToCart={addToCart} setBuyNowItem={setBuyNowItem} />} />
          <Route path="/products/:id" element={<Productdetails user={user} addToCart={addToCart} setBuyNowItem={setBuyNowItem} />} />

          <Route path="/values" element={<Values />} />
          <Route path="/trustedby" element={<TrustedBy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/news/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} userEmail={userEmail} />} />
          <Route path="/buy" element={<Buy buyNowItem={buyNowItem} user={user} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LenisWrapper>
  );
}

export default App;
