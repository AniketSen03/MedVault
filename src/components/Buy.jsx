import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Buy = ({ buyNowItem: propBuyNowItem, user }) => {
  useEffect(() => {
    document.title = "Order - MedVault";
  }, []);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMode, setCheckoutMode] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const mode = localStorage.getItem("checkoutMode");
    setCheckoutMode(mode);

    if (mode === "cart") {
      const cartData = JSON.parse(localStorage.getItem("buyCartItems") || "[]");
      setCartItems(cartData);
    } else {
      const item = propBuyNowItem || JSON.parse(localStorage.getItem("buyNowItem") || "null");
      setBuyNowItem(item);
    }
  }, [propBuyNowItem]);

  const finalUser = user || JSON.parse(localStorage.getItem("user") || "null");
  const finalItem = buyNowItem || JSON.parse(localStorage.getItem("buyNowItem") || "null");

  // ✅ Show login message before anything else
  if (!finalUser || !finalUser.email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-center text-blue-500 text-lg">
          Please log in to place an order.
        </p>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    email: finalUser.email || '',
    phone: '',
    address: '',
    deliveryInstructions: '',
    city: '',
    zip: '',
    country: '',
    addressType: '',
    quantity: 1,
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingPhone: '',
    billingEmail: '',
    billingNote: '',
    gst: '',
  });

  const totalPrice = checkoutMode === "cart"
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    : finalItem ? (finalItem.price * formData.quantity).toFixed(2) : "0.00";

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Basic numeric validation
    if (["phone", "zip", "cardNumber", "cvv", "billingPhone"].includes(name)) {
      if (!/^\d*$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, [name]: "Only Digits allowed" }));
      } else {
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleRemoveFromBuyCart = async (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("buyCartItems", JSON.stringify(updatedCart));

    try {
      await axios.post("http://localhost:3000/cart", {
        items: updatedCart,
        user: finalUser.email,
      });
    } catch (error) {
      console.error("Failed to update cart in DB:", error);
    }
  };

  const handleRemoveBuyNowItem = () => {
    setBuyNowItem(null);
    localStorage.removeItem("buyNowItem");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for existing form errors
    const hasErrors = Object.values(formErrors).some((err) => err);
    if (hasErrors) {
      alert("Please fix the form errors before submitting.");
      return;
    }

    // Existing cart and item check

    if (checkoutMode === "cart" && cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (checkoutMode !== "cart" && !finalItem) {
      alert("No item selected to buy.");
      return;
    }

    const orderData = {
      ...formData,
      products: checkoutMode === "cart" ? cartItems : [finalItem],
      total: totalPrice,
      orderDate: new Date(),
    };

    try {
      const response = await axios.post("http://localhost:3000/order", orderData);
      if (response.status === 201) {
        alert(`Thank you ${formData.name}, your order of ₹${totalPrice} has been placed!`);
        localStorage.removeItem("buyNowItem");
        localStorage.removeItem("checkoutMode");
        localStorage.removeItem("buyCartItems");
        navigate("/");
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Order failed. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Review Order Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Order</h2>

          {checkoutMode === "cart" && cartItems.length === 0 && (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          {checkoutMode === "cart" && cartItems.map((item, i) => (
            <div key={i} className="mb-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mb-2" />
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
              <button
                onClick={() => handleRemoveFromBuyCart(i)}
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-600"
              >
                Remove
              </button>
            </div>
          ))}

          {checkoutMode !== "cart" && finalItem && (
            <div className="mb-4 border-b pb-4">
              <img src={finalItem.image} alt={finalItem.name} className="w-24 h-24 object-cover rounded mb-2" />
              <h4 className="text-lg font-semibold">{finalItem.name}</h4>
              <p className="text-gray-600">₹{finalItem.price} x {formData.quantity}</p>
              <button
                onClick={handleRemoveBuyNowItem}
                className="flex items-center gap-2 mt-2 px-3 py-1 bg-blue-700 text-white text-sm rounded hover:bg-blue-800 transition hover:translate-x-1 delay-150 duration-300 ease-in-out hover:shadow-lg"
              >
                Remove <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          )}

          {checkoutMode !== "cart" && !finalItem && (
            <p className="text-gray-500">No item selected to buy.</p>
          )}

          <p className="text-lg font-bold text-blue-600 mt-4">Total: ₹{totalPrice}</p>
        </div>

        {/* Shipping & Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping & Payment Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} maxLength={20} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
            <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} minLength={10} maxLength={10} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}

            <input name="address" type="text" placeholder="Street Address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
            <textarea name="deliveryInstructions" placeholder="Delivery Instructions (optional)" value={formData.deliveryInstructions} onChange={handleChange} rows="3" className="w-full px-4 py-3 border rounded-lg outline-blue-200" />

            <div className="flex gap-4">
              <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} maxLength={20} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
              <input name="zip" type="text" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
              {formErrors.zip && <p className="text-red-500 text-sm">{formErrors.zip}</p>}
            </div>

            <select name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required>
              <option value="">🌍 Select Country</option>
              <option value="India">🇮🇳 India</option>
              <option value="USA">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="Canada">🇨🇦 Canada</option>
            </select>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="addressType" value="Residential" checked={formData.addressType === "Residential"} onChange={handleChange} /> Residential 🏠
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="addressType" value="Business" checked={formData.addressType === "Business"} onChange={handleChange} /> Business 🏢
              </label>
            </div>

            <input name="gst" type="text" placeholder="GST Number (optional)" value={formData.gst} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" />

            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required>
              <option value="">💳 Choose Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>


            {["Credit Card", "Debit Card"].includes(formData.paymentMethod) && (
              <>
                <input name="cardName" type="text" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
                <input name="cardNumber" type="text" placeholder="Card Number (16 digits)" value={formData.cardNumber} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" maxLength={16} required />
                {formErrors.cardNumber && <p className="text-red-500 text-sm outline-blue-200">{formErrors.cardNumber}</p>}
                <div className="flex gap-4">
                  <input name="expiry" type="text" placeholder="Expiry (MM/YY)" value={formData.expiry} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" required />
                  <input name="cvv" type="password" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg outline-blue-200" maxLength={4} required />
                  {formErrors.cvv && <p className="text-red-500 text-sm">{formErrors.cvv}</p>}
                </div>
              </>
            )}
            {["Credit Card", "Debit Card"].includes(formData.paymentMethod) && (
              <>
                <input
                  name="billingPhone" type="tel" placeholder="Billing Contact Number"
                  value={formData.billingPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg outline-blue-200"
                />
                {formErrors.billingPhone && <p className="text-red-500 text-sm">{formErrors.billingPhone}</p>}
                <input
                  name="billingEmail"
                  type="email"
                  placeholder="Billing Email"
                  value={formData.billingEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg outline-blue-200"
                />
                <textarea
                  name="billingNote"
                  rows="3"
                  placeholder="Add billing note (optional)"
                  value={formData.billingNote}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg outline-blue-200"
                />
              </>
            )}

            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg mt-4 transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg">
              Confirm & Pay ₹{totalPrice}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Buy;
