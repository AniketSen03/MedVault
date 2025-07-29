import React, { useEffect } from "react";
import axios from "axios"; // ✅ Add this line
import { useNavigate } from "react-router-dom";


const Cart = ({ cartItems, setCartItems, removeFromCart, updateQuantity, userEmail }) => {
  useEffect(() => {
    document.title = "Cart - MedVault";
  }, []);
  const navigate = useNavigate();

  const saveCartToMongo = async () => {
    if (!userEmail) {
      alert("Please login to save your cart.");

      return;
    }

    try {
      await axios.post("https://med-vault-backend.vercel.app/api/cart", {
        items: cartItems,
        user: userEmail,
      });
      // ✅ Removed alert
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 1);
    }, 0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cart/${userEmail}`);
        const items = response.data.items || [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };

    if (userEmail) {
      fetchCart();
    }
  }, [userEmail]);

  useEffect(() => {
    if (cartItems.length > 0 && userEmail) {
      saveCartToMongo();
    }
  }, [cartItems, userEmail]);


  return (
    <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-4 shadow-sm bg-white gap-4"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    ₹{item.price?.toFixed(2) || "N/A"}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        updateQuantity(idx, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 text-white bg-blue-500 rounded text-sm hover:bg-blue-600 transition delay-150 duration-300 ease-in-out hover:shadow-lg"
                    >
                      −
                    </button>
                    <span className="text-sm text-gray-800 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(idx, item.quantity + 1)
                      }
                      className="px-2 py-1 text-white bg-blue-500 rounded text-sm hover:bg-blue-600 transition delay-150 duration-300 ease-in-out hover:shadow-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-md font-medium">
                  ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </p>
                <button
                  className="flex items-center gap-2 px-3 py-1 bg-blue-700 text-white rounded text-sm transition hover:translate-x-1 hover:bg-blue-800 delay-150 duration-300 ease-in-out hover:shadow-lg"
                  onClick={() => removeFromCart(idx)}
                >
                  Remove <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Subtotal section */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-6 gap-4">
            <h3 className="text-lg font-bold">
              Subtotal: ₹{getTotal().toFixed(2)}
            </h3>
            <button
              onClick={async () => {
                await saveCartToMongo();

                // ✅ Save entire cart to localStorage
                localStorage.setItem("buyCartItems", JSON.stringify(cartItems));

                // ✅ Also save a flag to indicate it's a cart checkout
                localStorage.setItem("checkoutMode", "cart");

                navigate("/buy");
              }}

              className="flex items-center gap-2 mt-3 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition hover:translate-x-3 delay-150 duration-300 ease-in-out hover:shadow-lg"
            >
              Proceed to Checkout
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
